import React,{act} from 'react';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Window} from 'happy-dom';
import {usePresenters} from '../src/hooks/usePresenters';
import {presentersCacheKey} from '../src/lib/presenters';
const win=new Window({url:'https://classroom.example'});
Object.assign(globalThis,{window:win,document:win.document,HTMLElement:win.HTMLElement,localStorage:win.localStorage,IS_REACT_ACT_ENVIRONMENT:true});
const rows=Array.from({length:6},(_,i)=>({chapter:i+1,name:`Pessoa ${i+1}`}));
test('offline cache survives failure; late requests preserve session edits; reload restores database',async()=>{
  const original=globalThis.fetch;
  const {createRoot}=await import('react-dom/client');
  const container=document.createElement('div'); document.body.append(container);
  const root=createRoot(container);
  let api:ReturnType<typeof usePresenters>;
  function Harness(){api=usePresenters();return <output>{api.names.join(',')} {api.status}</output>;}
  try {
    localStorage.setItem(presentersCacheKey,JSON.stringify(rows));
    globalThis.fetch=async()=>{throw new Error('offline');};
    await act(async()=>{root.render(<Harness/>);});
    await act(async()=>{await new Promise(resolve=>setTimeout(resolve,15));});
    assert.match(container.textContent!,/Pessoa 1/);
    assert.match(container.textContent!,/Banco indisponível/);
    let complete!:(response:Response)=>void;
    globalThis.fetch=()=>new Promise<Response>(resolve=>{complete=resolve;});
    await act(async()=>{api.restore();api.edit(0,'Prévia');});
    await act(async()=>{complete(Response.json(rows));});
    assert.equal(api!.names[0],'Prévia');
    globalThis.fetch=async()=>Response.json(rows);
    await act(async()=>{api.restore();});
    assert.equal(api!.names[0],'Pessoa 1');
    assert.match(container.textContent!,/sincronizados/);
  }finally{
    await act(async()=>root.unmount());container.remove();globalThis.fetch=original;localStorage.clear();
  }
});
