import {spawn} from 'node:child_process';
// Managed QA uses the exact production export. Local development retains HMR.
const managed=process.argv.includes('--strictPort')||process.env.SITES_MANAGED_LINUX_CONTAINER==='1';
const run=(args)=>spawn(process.execPath,args,{stdio:'inherit'});
let child;
if(managed){
 child=spawn(process.execPath,['scripts/serve.mjs'],{stdio:'inherit',env:{...process.env,PREVIEW_HOST:'0.0.0.0'}});
 child.on('exit',code=>process.exit(code??0));
}else{
 child=run(['node_modules/next/dist/bin/next','dev','--webpack','--hostname','0.0.0.0','--port','4173']);
 child.on('exit',code=>process.exit(code??0));
}
for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>child?.kill(signal));
