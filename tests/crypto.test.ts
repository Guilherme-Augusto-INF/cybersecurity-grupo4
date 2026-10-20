import {test} from 'node:test';
import assert from 'node:assert/strict';
import {encryptMessage,decryptMessage} from '../src/lib/crypto';
import {inspectPassword} from '../src/lib/password.mjs';
test('AES-GCM recovers Portuguese text without exporting its key',async()=>{const message='Informação fictícia — proteção 🔐';const packet=await encryptMessage(message);assert.equal(await decryptMessage(packet),message);assert.equal(packet.key.extractable,false);assert.equal(packet.iv.byteLength,12);assert.notEqual(packet.display,message);});
test('encrypting twice uses independent keys and IVs',async()=>{const a=await encryptMessage('exemplo');const b=await encryptMessage('exemplo');assert.notDeepEqual(a.iv,b.iv);assert.notEqual(a.display,b.display);await assert.rejects(()=>decryptMessage({...a,key:b.key}));});
test('authenticated encryption rejects ciphertext tampering',async()=>{const packet=await encryptMessage('dados fictícios');const bytes=new Uint8Array(packet.cipher);bytes[0]^=1;await assert.rejects(()=>decryptMessage(packet));});
test('password heuristic flags common patterns even when long',()=>{assert.equal(inspectPassword('senha123456789012345').predictable,true);assert.equal(inspectPassword('aaaaaaaaaaaaaaaaaaaa').predictable,true);assert.equal(inspectPassword('').score,0);assert.equal(inspectPassword('Curta!').long,false);assert.equal(inspectPassword('cobre nebulosa quintal 72').score,3);});
