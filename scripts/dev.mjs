import { spawn } from 'node:child_process';
// Preview supervisors may append Vite flags; Next has its own explicit arguments.
const child=spawn(process.execPath,['node_modules/next/dist/bin/next','dev','--webpack','--hostname','0.0.0.0','--port','4173'],{stdio:'inherit'});
for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>child.kill(signal));
child.on('exit',code=>process.exit(code??0));
