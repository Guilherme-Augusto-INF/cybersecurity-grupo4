'use client';
import {useRef,useState} from 'react';
import {ArrowRight, Check, Database, KeyRound, LockKeyhole, RotateCcw, Server, ShieldCheck, UserRound, Code2, Globe2, Eye, EyeOff} from 'lucide-react';
import {inspectPassword} from '@/lib/password.mjs';
import {encryptMessage,decryptMessage} from '@/lib/crypto';
export function NetworkLab(){
 const [step,setStep]=useState(0);const [protectedMode,setProtectedMode]=useState(false);
 const labels=['Usuário','Aplicação','API','Servidor','Banco de dados'];const icons=[UserRound,Globe2,Code2,Server,Database];
 const statuses=['Rede em operação. Dados fictícios permanecem protegidos.','Uma requisição não confiável chega à aplicação.','A API deixa passar uma entrada sem o tratamento adequado.','O servidor monta uma consulta por concatenação.','A falha permite acesso indevido. Registro fictício exposto: aluno_demo / turma A.'];
 return <div className={`lab network-lab ${step>0&&!protectedMode?'danger':''}`}>
 <div className="lab-top"><span>LAB / 01</span><span>SIMULAÇÃO CONCEITUAL</span></div>
 <div className="architecture">{labels.map((label,i)=>{const Icon=icons[i];return <div className={`node ${i<=step?'lit':''}`} key={label}><span className="node-icon"><Icon size={27}/>{protectedMode&&i===2&&<ShieldCheck className="node-shield" size={20}/>}</span><small>{label}</small>{i<4&&<ArrowRight className="node-arrow" size={15}/>}</div>;})}</div>
 <div className="terminal-output" role="status"><span>{protectedMode?'[BLOQUEADO]':'[FLUXO '+step+'/4]'}</span><p>{protectedMode?'A API rejeita a operação indevida; parâmetros e autorização protegem o acesso. A simulação para aqui.':statuses[step]}</p></div>
 <div className="lab-actions"><button className="primary" onClick={()=>setStep(v=>Math.min(v+1,4))} disabled={step===4||protectedMode}>{step===0?'Iniciar simulação':'Avançar fluxo'}<ArrowRight size={16}/></button><button onClick={()=>{setProtectedMode(!protectedMode);setStep(2);}}>{protectedMode?'Remover defesa fictícia':'Ativar proteção'}</button><button className="icon-button" aria-label="Reiniciar rede" onClick={()=>{setStep(0);setProtectedMode(false);}}><RotateCcw size={16}/></button></div>
 <p className="fine">Nenhuma requisição ou exploração real. O diagrama simplifica uma arquitetura possível.</p></div>;
}
export function PasswordLab(){
 const [password,setPassword]=useState('');const [show,setShow]=useState(false);const [mfa,setMfa]=useState(false);const result=inspectPassword(password);
 return <div className="lab"><div className="lab-top"><span>LAB / 02</span><span>100% LOCAL</span></div>
 <label htmlFor="fictional-password">Teste uma senha fictícia</label><div className="password-input"><input id="fictional-password" type={show?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} autoComplete="off" maxLength={128} placeholder="Não use sua senha real" spellCheck={false}/><button className="icon-button" aria-label={show?'Ocultar exemplo':'Mostrar exemplo'} onClick={()=>setShow(!show)}>{show?<EyeOff size={18}/>:<Eye size={18}/>}</button></div>
 <div className="strength" aria-hidden="true">{[1,2,3].map(n=><span key={n} className={password&&result.score>=n?'filled':''}/>)}</div><p className="strength-label" role="status">{result.label}</p>
 <ul className="password-checks"><li className={result.long?'pass':''}><Check size={16}/>15 ou mais caracteres</li><li className={password&&!result.predictable?'pass':''}><Check size={16}/>Sem padrões comuns detectados</li><li className={result.varied?'pass':''}><Check size={16}/>Boa diversidade de caracteres</li></ul>
 <div className="mfa-flow"><span><LockKeyhole size={20}/> Senha</span><span className={mfa?'factor active':'factor'}><KeyRound size={20}/>{mfa?' + Chave de segurança':'Fator único'}</span><LockKeyhole size={21}/></div>
 <div className="lab-actions"><button onClick={()=>setPassword("Nebulosa!ponte-laranja47")}>Carregar exemplo</button><button className="primary" aria-pressed={mfa} onClick={()=>setMfa(!mfa)}>{mfa?'Comparar sem MFA':'Adicionar segundo fator'}</button><button className="icon-button" aria-label="Reiniciar senha" onClick={()=>{setPassword('');setMfa(false);setShow(false);}}><RotateCcw size={16}/></button></div>
 <p className="fine">Heurística educativa, sem tempo estimado de quebra. Não detecta todas as palavras ou senhas vazadas. Nada é enviado ou salvo; comprimento e diversidade não garantem segurança.</p></div>;
}
export function CryptoLab(){
 const [message,setMessage]=useState('O futuro precisa de proteção.');const [packet,setPacket]=useState<Awaited<ReturnType<typeof encryptMessage>>|null>(null);const [recovered,setRecovered]=useState('');const [busy,setBusy]=useState(false);const [error,setError]=useState('');const generation=useRef(0);
 async function run(){const id=++generation.current;setBusy(true);setError('');setRecovered('');setPacket(null);try{const next=await encryptMessage(message);if(id===generation.current)setPacket(next);}catch(e){if(id===generation.current)setError(e instanceof Error?e.message:'Não foi possível cifrar.');}finally{if(id===generation.current)setBusy(false);}}
 async function recover(){if(!packet)return;const id=generation.current;try{const text=await decryptMessage(packet);if(id===generation.current)setRecovered(text);}catch{if(id===generation.current)setError('Falha de integridade ou de recuperação.');}}
 function reset(){generation.current++;setPacket(null);setRecovered('');setError('');setBusy(false);setMessage('O futuro precisa de proteção.');}
 return <div className="lab crypto-lab"><div className="lab-top"><span>LAB / 03</span><span>AES-256-GCM / WEB CRYPTO</span></div>
 <label htmlFor="message">01 / Mensagem fictícia</label><input id="message" value={message} maxLength={160} onChange={e=>{generation.current++;setBusy(false);setMessage(e.target.value);setPacket(null);setRecovered('');}}/>
 <div className="crypto-key"><KeyRound size={19}/><div><strong>02 / Chave secreta de 256 bits</strong><small>{packet?'Gerada · não exportável · apenas na memória':'Nova chave e IV aleatório a cada execução'}</small></div></div>
 <div className="cipher-box"><span>03 / TEXTO CIFRADO · HEXADECIMAL</span><output>{packet?.display||'A mensagem será transformada aqui.'}</output></div>
 <div className="recovered" role="status">{error|| (recovered?`04 / Recuperado: ${recovered}`:packet?'Cifrado. Use a mesma chave para recuperar.':'Aguardando transformação.')}</div>
 <div className="lab-actions"><button className="primary" onClick={run} disabled={busy||!message}>{busy?'Cifrando…':packet?'Cifrar novamente':'Cifrar mensagem'}<LockKeyhole size={16}/></button><button onClick={recover} disabled={!packet||busy}>Recuperar</button><button className="icon-button" aria-label="Reiniciar criptografia" onClick={reset}><RotateCcw size={16}/></button></div>
 <p className="fine">Criptografia real em uma demonstração didática. Chave, IV e mensagem ficam nesta aba. Não use para guardar segredos. HTTPS ou localhost é necessário.</p></div>;
}
const vulnerable=`// Pseudocódigo • PostgreSQL\nconst sql =\n  "SELECT nome FROM alunos " +\n  "WHERE matricula = '" + entrada + "'";\n\nconst resultado = await db.query(sql);\n// Entrada se mistura à instrução.`;
const safe=`// Pseudocódigo • PostgreSQL\nconst sql =\n  "SELECT nome FROM alunos " +\n  "WHERE matricula = $1";\n\nconst resultado = await db.query(sql, [entrada]);\n// Entrada é tratada como dado.`;
export function CodeLab(){
 const [secure,setSecure]=useState(false);
 return <div className={`lab code-lab ${secure?'secure':'danger'}`}>
  <div className="lab-top"><span>LAB / 04</span><span>COMPARAÇÃO / SEM EXECUÇÃO</span></div>
  <div className="code-tabs" role="group" aria-label="Comparar implementações"><button aria-pressed={!secure} onClick={()=>setSecure(false)}>Investigar a falha</button><button aria-pressed={secure} onClick={()=>setSecure(true)}>Entender a proteção</button></div>
  <div className="code-comparison">{[{title:'Implementação vulnerável',label:'CONCATENAÇÃO',code:vulnerable,selected:!secure},{title:'Implementação protegida',label:'PARÂMETROS',code:safe,selected:secure}].map((item,i)=><div key={item.title} className={`code-pane ${item.selected?'selected':''} ${i===0?'unsafe-pane':'safe-pane'}`}><div className="editor-top"><span>{i===0?'01 / VULNERÁVEL':'02 / PROTEGIDA'}</span><span>{item.label}</span></div><pre role="region" tabIndex={0} aria-label={item.title}><code>{item.code}</code></pre></div>)}</div>
  <p className="code-explanation" role="status">{secure?<><ShieldCheck size={20}/><span><strong>$1 recebe um valor separado.</strong> O driver mantém a estrutura SQL independente da entrada. A autorização ainda precisa ser verificada.</span></>:<><Code2 size={20}/><span><strong>+ entrada + muda o comando.</strong> Misturar texto recebido e SQL permite que uma entrada altere a intenção da consulta.</span></>}</p>
  <div className="lab-actions"><button className="primary" onClick={()=>setSecure(!secure)}>{secure?'Rever vulnerabilidade':'Proteger consulta'}<ArrowRight size={16}/></button><button className="icon-button" aria-label="Reiniciar código" onClick={()=>setSecure(false)}><RotateCcw size={16}/></button></div>
 </div>;
}
