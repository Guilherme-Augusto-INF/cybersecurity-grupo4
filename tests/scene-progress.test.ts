import {test} from 'node:test';
import assert from 'node:assert/strict';
import {sceneProgressAt} from '../src/lib/scene-progress';
const ranges=[{start:0,end:1000},{start:1000,end:2500},{start:2500,end:3200}];
test('single scroll timeline moves monotonically between scene forms',()=>{
  assert.equal(sceneProgressAt(0,ranges),0);
  assert.equal(sceneProgressAt(500,ranges),0.5);
  assert.equal(sceneProgressAt(1000,ranges),1);
  assert.equal(sceneProgressAt(1750,ranges),1.5);
  assert.equal(sceneProgressAt(2500,ranges),2);
  assert.equal(sceneProgressAt(3200,ranges),3);
  assert.equal(sceneProgressAt(3800,ranges),3);
  assert.equal(sceneProgressAt(-100,ranges),0);
  assert.equal(sceneProgressAt(120,[]),0);
  assert.equal(sceneProgressAt(Number.NaN,ranges),0);
  for(let y=0,last=0;y<=3600;y+=13){const next=sceneProgressAt(y,ranges);assert.ok(next>=last);last=next;}
});
