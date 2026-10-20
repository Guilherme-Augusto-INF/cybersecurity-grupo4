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
