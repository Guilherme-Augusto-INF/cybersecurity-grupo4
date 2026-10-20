import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
const directory=path.resolve('out');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.woff':'font/woff','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8'};
const server=http.createServer(async(req,res)=>{
 try{const requestPath=decodeURIComponent(new URL(req.url,'http://localhost').pathname);let file=path.resolve(directory,'.'+requestPath);
 if(!file.startsWith(directory+path.sep)&&file!==directory){res.writeHead(403);res.end();return;}
 if((await stat(file).catch(()=>null))?.isDirectory())file=path.join(file,'index.html');
 const bytes=await readFile(file);res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?undefined:bytes);
 }catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Página não encontrada.');}
});
server.listen(Number(process.env.PORT||4173),'127.0.0.1',()=>console.log('Apresentação local: http://localhost:'+(process.env.PORT||4173)));
