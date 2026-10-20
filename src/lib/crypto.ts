export async function encryptMessage(message:string){
  if(!globalThis.crypto?.subtle)throw new Error('Use HTTPS ou localhost para acessar Web Crypto.');
  const key=await crypto.subtle.generateKey({name:'AES-GCM',length:256},false,['encrypt','decrypt']);
  const iv=crypto.getRandomValues(new Uint8Array(12));
  const cipher=await crypto.subtle.encrypt({name:'AES-GCM',iv},key,new TextEncoder().encode(message));
  return {key,iv,cipher,display:Array.from(new Uint8Array(cipher),v=>v.toString(16).padStart(2,'0')).join('')};
}
export async function decryptMessage(packet:Awaited<ReturnType<typeof encryptMessage>>){
 const plain=await crypto.subtle.decrypt({name:'AES-GCM',iv:packet.iv},packet.key,packet.cipher);
 return new TextDecoder().decode(plain);
}
