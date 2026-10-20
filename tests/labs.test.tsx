import React,{act} from 'react';
import {test,afterEach} from 'node:test';
import assert from 'node:assert/strict';
import {Window} from 'happy-dom';
import type {Root} from 'react-dom/client';
import {NetworkLab,PasswordLab,CryptoLab,CodeLab} from '../src/components/Labs';
const win=new Window({url:'https://classroom.example'});
Object.assign(globalThis,{window:win,document:win.document,HTMLElement:win.HTMLElement,IS_REACT_ACT_ENVIRONMENT:true});
let root:Root;let container:HTMLElement;
async function mount(element:React.ReactNode){container=document.createElement('div');document.body.append(container);const {createRoot}=await import('react-dom/client');root=createRoot(container);await act(async()=>root.render(element));}
async function click(label:string){const b=Array.from(container.querySelectorAll('button')).find(b=>b.textContent?.trim()===label||b.getAttribute('aria-label')===label);assert.ok(b,`button ${label} exists`);await act(async()=>b.click());}
function text(){return container.textContent||'';}
afterEach(async()=>{if(root)await act(async()=>root.unmount());container?.remove();});
test('network demo advances four steps, blocks with protection and resets',async()=>{await mount(<NetworkLab/>);await click('Iniciar simulação');for(let i=0;i<3;i++)await click('Avançar fluxo');assert.match(text(),/aluno_demo/);await click('Ativar proteção');assert.match(text(),/BLOQUEADO/);await click('Reiniciar rede');assert.match(text(),/Rede em operação/);});
test('password and MFA demo updates and clears state locally',async()=>{await mount(<PasswordLab/>);const input=container.querySelector('input')!;const setter=Object.getOwnPropertyDescriptor(win.HTMLInputElement.prototype,'value')!.set!;await act(async()=>{setter.call(input,'senha1234567890123');input.dispatchEvent(new win.Event('input',{bubbles:true}) as unknown as Event);input.dispatchEvent(new win.Event('change',{bubbles:true}) as unknown as Event);});assert.match(text(),/Padrão previsível/);await click('Adicionar segundo fator');assert.match(text(),/Chave de segurança/);await click('Reiniciar senha');assert.equal(input.value,'');assert.match(text(),/Fator único/);});
test('code comparison changes implementation and reset restores vulnerable code',async()=>{await mount(<CodeLab/>);assert.match(container.querySelector('code')!.textContent!,/\+ entrada \+/);await click('Proteger consulta');assert.match(container.querySelector('code')!.textContent!,/\$1/);assert.match(container.querySelector('code')!.textContent!,/\[entrada\]/);await click('Reiniciar código');assert.match(text(),/CONCATENAÇÃO/);});
test('crypto component encrypts, recovers and resets using actual Web Crypto',async()=>{await mount(<CryptoLab/>);await click('Cifrar mensagem');await act(async()=>{await new Promise(resolve=>setTimeout(resolve,25));});const cipher=container.querySelector('output')!.textContent;assert.match(cipher!,/^[0-9a-f]+$/);await click('Recuperar');await act(async()=>{await new Promise(resolve=>setTimeout(resolve,25));});assert.match(text(),/04 \/ Recuperado: O futuro precisa de proteção/);await click('Reiniciar criptografia');assert.match(container.querySelector('output')!.textContent!,/transformada aqui/);});
