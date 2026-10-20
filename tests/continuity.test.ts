import {test} from 'node:test';
import assert from 'node:assert/strict';
import {narrativeAt} from '../src/lib/scene-progress';
test('single scene owner holds readable forms and never jumps at any chapter boundary',()=>{
 const ranges=Array.from({length:6},(_,i)=>({start:i*3000,introEnd:i*3000+1200,morphStart:i*3000+2300,end:(i+1)*3000}));
 let last=narrativeAt(0,ranges);
 for(let y=1;y<=18500;y++){
  const next=narrativeAt(y,ranges);assert.ok(next.progress>=last.progress);assert.ok(next.progress-last.progress<.003);assert.ok(Math.abs(next.turn-last.turn)<.003);assert.ok(Math.abs(next.focus-last.focus)<.003);last=next;
 }
 for(let i=0;i<6;i++)assert.equal(narrativeAt(i*3000+1800,ranges).progress,i);
 for(const y of [3000,6000,9000,12000,15000,18000])assert.ok(Math.abs(narrativeAt(y-.001,ranges).progress-narrativeAt(y+.001,ranges).progress)<.00001);
 assert.equal(narrativeAt(Number.NaN,ranges).progress,0);
});
