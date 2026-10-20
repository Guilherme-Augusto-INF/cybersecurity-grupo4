/** A single monotonic 0..N morph position across N full chapter ranges. */
export type ChapterRange = {start:number;end:number};
export function sceneProgressAt(position:number,ranges:ReadonlyArray<ChapterRange>):number {
  if(!ranges.length || !Number.isFinite(position))return 0;
  for(let i=0;i<ranges.length;i++){
    const {start,end}=ranges[i];
    if(position<=start)return i;
    if(position<end)return i+Math.max(0,Math.min(1,(position-start)/Math.max(1,end-start)));
  }
  return ranges.length;
}

export type NarrativeRange={start:number;introEnd:number;morphStart:number;end:number};
/** Hold each chapter's illustration; morph only across its seam. One scroll owner. */
export function narrativeAt(position:number,ranges:ReadonlyArray<NarrativeRange>){
 const y=Number.isFinite(position)?Math.max(0,position):0;
 let progress=ranges.length,focus=0;
 for(let i=0;i<ranges.length;i++){
  const r=ranges[i];
  if(y<r.start){progress=i;break;}
  if(y<=r.end){
   const t=Math.max(0,Math.min(1,(y-r.morphStart)/Math.max(1,r.end-r.morphStart)));
   progress=i+t*t*(3-2*t);focus=Math.sin(t*Math.PI)*.45;break;
  }
 }
 return {progress,focus,turn:Math.sin(y/2000)*1.7+progress*.2};
}
