'use client';
/* eslint-disable react-hooks/immutability -- Three.js owns mutable GPU buffers and camera; updates occur only inside useFrame. */
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
export type SceneState = {progress:number; paused:boolean; reduced:boolean};
const COUNT=900;
function target(i:number, phase:number){
  const a=i*2.39996323, z=1-2*(i+.5)/COUNT, r=Math.sqrt(1-z*z);
  const sphere=new THREE.Vector3(Math.cos(a)*r*2.4,z*2.4,Math.sin(a)*r*2.4);
  if(phase===0 || phase===1) return sphere.multiplyScalar(phase===1?1.12:1);
  if(phase===2){
    if(i<COUNT*.4){const t=(i/(COUNT*.4))*Math.PI;return new THREE.Vector3(Math.cos(t)*.98,Math.sin(t)*1.2+.5,Math.sin(a)*.32);}
    return new THREE.Vector3(Math.cos(a)*1.45, -1.7+((i%29)/29)*2.2,Math.sin(a)*.5);
  }
  if(phase===3){const t=i/COUNT*Math.PI*9;return new THREE.Vector3(Math.cos(t)*1.3,(i/COUNT-.5)*5,Math.sin(t)*1.3);}
  if(phase===4){const face=i%3, u=((i*17)%COUNT)/COUNT*3.5-1.75,v=((i*37)%COUNT)/COUNT*3.5-1.75;return face===0?new THREE.Vector3(u,v,i%2?1.75:-1.75):face===1?new THREE.Vector3(u,i%2?1.75:-1.75,v):new THREE.Vector3(i%2?1.75:-1.75,u,v);}
  if(phase===5){const person=i%9, angle=person/9*Math.PI*2, head=i%100<28, t=(i%100)/100;return new THREE.Vector3(Math.cos(angle)*2.1+Math.cos(a)*(head?.28:.42), head?1.05+Math.sin(a)*.28:-1.1+t*1.9,Math.sin(angle)*1.8+Math.sin(a)*.25);}
  const t=i/COUNT; const y=2.4-t*4.8; const w= t<.24? .5+t*6 : 2.1*Math.pow((1-t)/.76,.7);
  return new THREE.Vector3(Math.cos(a)*w,y,Math.sin(a)*.4);
}
function Network({state}:{state:React.RefObject<SceneState>}){
  const group=useRef<THREE.Group>(null);
  const geometry=useMemo(()=>new THREE.BufferGeometry(),[]);
  const material=useRef<THREE.PointsMaterial>(null);
  const lineGeometry=useMemo(()=>new THREE.BufferGeometry(),[]);
  const lineMaterial=useRef<THREE.LineBasicMaterial>(null);
  const coords=useMemo(()=>new Float32Array(COUNT*3),[]);
  const lineCoords=useMemo(()=>new Float32Array(180*6),[]);
  const targets=useMemo(()=>Array.from({length:7},(_,phase)=>Array.from({length:COUNT},(_,i)=>target(i,phase))),[]);
  const {invalidate,camera}=useThree();
  useEffect(()=>{
    geometry.setAttribute('position',new THREE.BufferAttribute(coords,3));
    lineGeometry.setAttribute('position',new THREE.BufferAttribute(lineCoords,3));
    const update=()=>invalidate();window.addEventListener('sceneupdate',update);
    const timer=setInterval(()=>{if(!state.current.paused&&!document.hidden)invalidate();},33);
    invalidate();return()=>{clearInterval(timer);window.removeEventListener('sceneupdate',update);geometry.dispose();lineGeometry.dispose();};
  },[coords,geometry,invalidate,lineCoords,lineGeometry,state]);
  useFrame(({clock})=>{
    const p=Math.min(state.current.progress,6), from=Math.floor(p), to=Math.min(from+1,6); const mix=THREE.MathUtils.smoothstep(p-from,0,1);
    const vec=new THREE.Vector3();
    for(let i=0;i<COUNT;i++){vec.copy(targets[from][i]).lerp(targets[to][i],mix);coords.set([vec.x,vec.y,vec.z],i*3);}
    for(let i=0;i<180;i++){const s=(i*5)%COUNT,d=(s+3)%COUNT;lineCoords.set(coords.subarray(s*3,s*3+3),i*6);lineCoords.set(coords.subarray(d*3,d*3+3),i*6+3);}
    if(geometry.attributes.position)geometry.attributes.position.needsUpdate=true;
    if(lineGeometry.attributes.position)lineGeometry.attributes.position.needsUpdate=true;
    const danger=p>.7&&p<1.7;
    const color=danger?'#FF425C':p>2.6&&p<3.8?'#A78BFF':'#55F5FF';
    material.current?.color.set(color);lineMaterial.current?.color.set(color);
    if(group.current){group.current.rotation.y=p*.43+(state.current.paused?0:Math.sin(clock.elapsedTime*.12)*.07);group.current.rotation.z=Math.sin(p)*.12;}
    camera.position.z=7.5-Math.sin(p*Math.PI)*.35;camera.position.x=Math.sin(p)*.3;
  });
  return <group ref={group} rotation={[.12,0,-.12]}>
    <points geometry={geometry}><pointsMaterial ref={material} color="#55F5FF" size={.027} transparent opacity={.8} sizeAttenuation depthWrite={false}/></points>
    <lineSegments geometry={lineGeometry}><lineBasicMaterial ref={lineMaterial} color="#55F5FF" transparent opacity={.17}/></lineSegments>
    <mesh><icosahedronGeometry args={[2.25,1]}/><meshBasicMaterial color="#2090b0" wireframe transparent opacity={.06}/></mesh>
    <Line points={Array.from({length:129},(_,i)=>[Math.cos(i/128*Math.PI*2)*3,0,Math.sin(i/128*Math.PI*2)*3] as [number,number,number])} color="#55F5FF" transparent opacity={.23} lineWidth={1}/>
    <mesh rotation={[.2,.4,1.2]}><torusGeometry args={[2.8,.006,4,100]}/><meshBasicMaterial color="#8357FF" transparent opacity={.4}/></mesh>
  </group>;
}
export default function DigitalScene({state}:{state:React.RefObject<SceneState>}){
  return <Canvas dpr={[1,1.5]} camera={{position:[0,0,7.5],fov:48}} frameloop="demand" gl={{antialias:false,alpha:true,powerPreference:'low-power'}} onCreated={({gl})=>{gl.setClearColor('#05070D',0);}}><Network state={state}/></Canvas>;
}
