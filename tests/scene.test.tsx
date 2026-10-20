import React,{act} from 'react';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Window} from 'happy-dom';
import NarrativeScene from '../src/components/NarrativeScene';
import {renderToStaticMarkup} from 'react-dom/server';
const win=new Window({url:'https://classroom.example'});
Object.assign(globalThis,{window:win,document:win.document,HTMLElement:win.HTMLElement,IS_REACT_ACT_ENVIRONMENT:true});
test('narrative remains visible without WebGL and all morphs stay finite in both directions',async()=>{
 const {createRoot}=await import('react-dom/client');const container=document.createElement('div');document.body.append(container);const root=createRoot(container);
 const state={current:{progress:0,paused:false,reduced:false,focus:0,turn:0}};
 const server=document.createElement('div');server.innerHTML=renderToStaticMarkup(<NarrativeScene state={state}/>);
 const positions=(el:Element)=>Array.from(el.querySelectorAll('circle[cx][cy]')).map(n=>[n.getAttribute('cx'),n.getAttribute('cy'),n.getAttribute('r'),n.getAttribute('opacity')]);
 await act(async()=>root.render(<NarrativeScene state={state}/>));
 assert.deepEqual(positions(container),positions(server),'initial SSR projection equals the first client frame');
 assert.equal(container.querySelectorAll('canvas').length,0);assert.equal(container.querySelectorAll('.scene-stages > g').length,7);
 for(const p of [...Array.from({length:25},(_,i)=>i/4),...Array.from({length:25},(_,i)=>6-i/4)]){
  state.current.progress=p;win.dispatchEvent(new win.Event('sceneupdate'));
  const nodes=container.querySelectorAll('circle[cx][cy]');for(const n of nodes){assert.ok(Number.isFinite(Number(n.getAttribute('cx'))));assert.ok(Number.isFinite(Number(n.getAttribute('cy'))));}
  const visible=Array.from(container.querySelectorAll('.scene-stages > g')).some(g=>Number(g.getAttribute('opacity'))>.1);assert.ok(visible,`visible stage at ${p}`);
 }
 state.current.reduced=true;state.current.progress=2.15;win.dispatchEvent(new win.Event('sceneupdate'));assert.equal(container.querySelector('.narrative-scene')!.getAttribute('data-scene-progress'),'2.000');
 await act(async()=>root.unmount());container.remove();
});
