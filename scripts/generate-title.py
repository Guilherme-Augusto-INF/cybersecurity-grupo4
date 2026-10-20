from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
font=TTFont('node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-500-normal.woff');glyphs=font.getGlyphSet();cmap=font.getBestCmap()
lookups=[]
if 'GPOS' in font:
 table=font['GPOS'].table
 for item in table.FeatureList.FeatureRecord:
  if item.FeatureTag=='kern':lookups.extend(table.LookupList.Lookup[i] for i in item.Feature.LookupListIndex)
def kern(left,right):
 value=0
 for lookup in lookups:
  for sub in lookup.SubTable:
   if lookup.LookupType==9:sub=sub.ExtSubTable
   if not hasattr(sub,'Coverage') or left not in sub.Coverage.glyphs:continue
   rec=None
   if sub.Format==1:
    pairs=sub.PairSet[sub.Coverage.glyphs.index(left)].PairValueRecord
    rec=next((p for p in pairs if p.SecondGlyph==right),None)
   elif sub.Format==2:
    a=sub.ClassDef1.classDefs.get(left,0);b=sub.ClassDef2.classDefs.get(right,0);rec=sub.Class1Record[a].Class2Record[b]
   if rec is not None and rec.Value1 is not None:value+=getattr(rec.Value1,'XAdvance',0) or 0
 return value
lines=[]
for text,spacing,size in [('CIBER',-75,1),('SEGURANÇA.',-65,.81)]:
 names=[cmap[ord(c)] for c in text];x=0;paths=[]
 for i,name in enumerate(names):
  pen=SVGPathPen(glyphs);glyphs[name].draw(TransformPen(pen,(1,0,0,-1,x,796)));d=pen.getCommands();attr=' fill="var(--cyan)"' if text[i]=='.' else ''
  paths.append(f'<path{attr} d="{d}"/>')
  x+=font['hmtx'][name][0]
  if i<len(names)-1:x+=spacing+kern(name,names[i+1])
 lines.append(f'<svg className="hero-word" aria-hidden="true" focusable="false" viewBox="0 0 {x} 900" style={{{{width:"{x/1000}em",height:".9em",fontSize:"{size}em"}}}} fill="currentColor">'+''.join(paths)+'</svg>')
Path('src/components/HeroTitle.tsx').write_text("// Display lettering outlined from Space Grotesk 500. No font download is needed to paint it.\nexport default function HeroTitle(){return <h1 id=\"title-0\"><span className=\"sr-only\">CIBERSEGURANÇA.</span>"+''.join(lines)+"</h1>;}\n")
print({'outline_bytes':Path('src/components/HeroTitle.tsx').stat().st_size})
