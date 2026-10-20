import test from 'node:test';
import assert from 'node:assert/strict';
import {fetchPresenters,parsePresenters,presentersDatabase} from '../src/lib/presenters';
const rows=Array.from({length:6},(_,i)=>({chapter:i+1,name:`Pessoa ${i+1}`}));
test('presenters require a complete, unique, valid six-chapter list',()=>{
  assert.deepEqual(parsePresenters([...rows].reverse()),rows.map(r=>r.name));
  assert.equal(parsePresenters(rows.slice(1)),null);
  assert.equal(parsePresenters([...rows.slice(0,5),rows[0]]),null);
  for(const name of ['', '   ', ' Nome ', 'a'.repeat(41),'Nome\nOutro',null]) {
    assert.equal(parsePresenters([{chapter:1,name},...rows.slice(1)]),null);
  }
  assert.equal(parsePresenters(null),null);
});
test('names API is read-only, abortable and rejects failed or partial responses',async()=>{
  const original=globalThis.fetch;
  const controller=new AbortController();
  try {
    globalThis.fetch=async(input,init)=>{
      assert.equal(String(input),`${presentersDatabase.url}/rest/v1/presenters?select=chapter,name&order=chapter.asc`);
      assert.equal(init?.signal,controller.signal);
      assert.equal(init?.method,undefined);
      assert.equal(new Headers(init?.headers).get('apikey'),presentersDatabase.key);
      return Response.json(rows);
    };
    assert.deepEqual(await fetchPresenters(controller.signal),rows.map(r=>r.name));
    globalThis.fetch=async()=>Response.json([]);
    await assert.rejects(fetchPresenters(controller.signal));
    globalThis.fetch=async()=>new Response('',{status:503});
    await assert.rejects(fetchPresenters(controller.signal));
  }finally{globalThis.fetch=original;}
});
