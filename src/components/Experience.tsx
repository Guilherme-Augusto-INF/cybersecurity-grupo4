'use client';
import dynamic from 'next/dynamic';
import {Component,useCallback,useEffect,useRef,useState,type CSSProperties,type ReactNode} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {ArrowDown,ArrowRight,ArrowUpRight,BookOpen,ChevronLeft,ChevronRight,Expand,Menu,Pause,Play,Settings2,Shield,ShieldCheck,X,Users,Network} from 'lucide-react';
import {chapters,presenters,references,threats} from '@/data/presentation';
import {CodeLab,CryptoLab,NetworkLab,PasswordLab} from './Labs';
import {navigationTarget} from '@/lib/navigation';
import {sceneProgressAt, type ChapterRange} from '@/lib/scene-progress';
import type {SceneState} from './DigitalScene';
const DigitalScene=dynamic(()=>import('./DigitalScene'),{ssr:false});
class SceneBoundary extends Component<{children:ReactNode},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return {failed:true};}render(){return this.state.failed?null:this.props.children;}}
export default function Experience(){
 const root=useRef<HTMLDivElement>(null),dialog=useRef<HTMLDialogElement>(null),progressBar=useRef<HTMLDivElement>(null),lenis=useRef<Lenis|null>(null);
 const scene=useRef<SceneState>({progress:0,paused:false,reduced:false});
 const [active,setActive]=useState(0),[presentation,setPresentation]=useState(false),[paused,setPaused]=useState(false),[reduced,setReduced]=useState(false),[webgl,setWebgl]=useState(false),[panel,setPanel]=useState<'chapters'|'references'|'settings'|'notes'>('chapters'),[names,setNames]=useState(presenters.map(p=>p.name)),[fullStatus,setFullStatus]=useState('');
 const beatIndex=useRef(0),movingUntil=useRef(0),returnFocus=useRef<HTMLElement|null>(null);
 const jump=useCallback((index:number)=>{
   const beats=Array.from(document.querySelectorAll<HTMLElement>('[data-beat]'));const target=beats[Math.max(0,Math.min(beats.length-1,index))];if(!target)return;
   beatIndex.current=Math.max(0,Math.min(beats.length-1,index));movingUntil.current=performance.now()+850;
   const y=target.getBoundingClientRect().top+window.scrollY;
   if(lenis.current)lenis.current.scrollTo(y,{duration:.8,force:true});else window.scrollTo({top:y,behavior:reduced?'instant':'smooth'});
 },[reduced]);
 const openPanel=useCallback((type:typeof panel)=>{setPanel(type);returnFocus.current=document.activeElement as HTMLElement;dialog.current?.showModal();},[]);
 const closePanel=useCallback(()=>{dialog.current?.close();returnFocus.current?.focus();},[]);
 const toggleFullscreen=useCallback(async()=>{try{if(document.fullscreenElement){await document.exitFullscreen();}else{await document.documentElement.requestFullscreen();}setFullStatus('');}catch{setFullStatus('Tela cheia indisponível. O modo apresentação continua ativo.');}},[]);
 // Starting must not *exit* fullscreen when the user has already enabled it.
 async function start(){
   setPresentation(true);
   jump(0);
   if(!document.fullscreenElement)await toggleFullscreen();
 }
 useEffect(()=>{
   const media=window.matchMedia('(prefers-reduced-motion: reduce)');
   const change=()=>{setReduced(media.matches);scene.current.reduced=media.matches;};change();media.addEventListener('change',change);
   const canvas=document.createElement('canvas');const gl=canvas.getContext('webgl2');setWebgl(Boolean(gl)&&window.innerWidth>820&&!media.matches);gl?.getExtension('WEBGL_lose_context')?.loseContext();
   return()=>media.removeEventListener('change',change);
 },[]);
 useEffect(()=>{scene.current.paused=paused||reduced;window.dispatchEvent(new Event('sceneupdate'));},[paused,reduced]);
 useEffect(()=>{
  gsap.registerPlugin(ScrollTrigger);
  let smooth:Lenis|null=null;
  const ticker=(time:number)=>smooth?.raf(time*1000);
  if(!reduced&&!window.matchMedia('(pointer: coarse)').matches){smooth=new Lenis({autoRaf:false,lerp:.1,smoothWheel:true});lenis.current=smooth;smooth.on('scroll',ScrollTrigger.update);gsap.ticker.add(ticker);}
  const ctx=gsap.context(()=>{
   gsap.utils.toArray<HTMLElement>('.chapter').forEach((section,i)=>{
    ScrollTrigger.create({trigger:section,start:'top center',end:'bottom center',onEnter:()=>setActive(i),onEnterBack:()=>setActive(i)});
    // The scene is driven by one document-wide timeline below, not by overlapping triggers.
    if(!reduced){const intro=section.querySelector('.intro-shell'),copy=section.querySelector('.intro-copy'),depth=section.querySelector('.depth-number');
      // Distinct depth planes prevent the camera from feeling like a simple fade-on-scroll.
      const annotation=section.querySelector('.scene-annotation');
      const bottom=section.querySelector('.intro-bottom');
      gsap.timeline({scrollTrigger:{trigger:intro,start:'top top',end:'bottom top',scrub:.35}})
        .to(depth,{y:-230,x:40,rotate:8,ease:'none'},0)
        .to(annotation,{y:-115,x:80,opacity:.08,ease:'none'},.08)
        .to(bottom,{y:55,opacity:.08,ease:'none'},.42)
        .to(copy,{y:-75,scale:.96,opacity:.10,ease:'none'},.44);
      gsap.fromTo(section.querySelectorAll('.point'),{y:22,opacity:.35},{y:0,opacity:1,stagger:.08,ease:'none',scrollTrigger:{trigger:section.querySelector('.lesson'),start:'top 85%',end:'top 25%',scrub:.5}});
    }
   });
   if(!reduced){gsap.timeline({scrollTrigger:{trigger:'.closing',start:'top top',end:'bottom bottom',scrub:.5}}).to('.closing-first',{opacity:0,y:-25,duration:.3},.1).fromTo('.closing-second',{opacity:0,y:30},{opacity:1,y:0,duration:.3},.45);}
   // A single scroll owner prevents the chapter/closing trigger overlap from
   // rewinding the WebGL morph at the boundary of chapter six.
   let ranges:ChapterRange[]=[];
   const measure=()=>{
     ranges=Array.from(root.current?.querySelectorAll<HTMLElement>('.chapter')||[]).map(section=>{
       const start=section.getBoundingClientRect().top+window.scrollY;
       return {start,end:start+section.offsetHeight};
     });
   };
   const syncScene=()=>{
     scene.current.progress=sceneProgressAt(window.scrollY,ranges);
     window.dispatchEvent(new Event('sceneupdate'));
     const maxScroll=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
     if(progressBar.current)progressBar.current.style.transform=`scaleX(${Math.min(1,window.scrollY/maxScroll)})`;
     if(performance.now()>movingUntil.current){
       const beats=Array.from(root.current?.querySelectorAll<HTMLElement>('[data-beat]')||[]);
       let nearest=0,distance=Infinity;
       beats.forEach((beat,i)=>{const d=Math.abs(beat.getBoundingClientRect().top);if(d<distance){distance=d;nearest=i;}});
       beatIndex.current=nearest;
     }
   };
   ScrollTrigger.create({start:0,end:'max',onRefresh:()=>{measure();syncScene();},onUpdate:syncScene});
   measure();syncScene();
  },root);
  return()=>{ctx.revert();gsap.ticker.remove(ticker);smooth?.destroy();lenis.current=null;};
 },[reduced]);
 useEffect(()=>{
  const key=(e:KeyboardEvent)=>{
   const target=e.target;
   if(dialog.current?.open || (target instanceof Element && target.closest('input,textarea,select,summary,[contenteditable]')) || e.ctrlKey||e.altKey||e.metaKey)return;
   if(e.key==='Escape'){setPresentation(false);if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});return;}
   if(!presentation)return;
   const next=navigationTarget(e.key,beatIndex.current,document.querySelectorAll('[data-beat]').length);
   if(next!==null){e.preventDefault();if(e.repeat||performance.now()<movingUntil.current)return;jump(next);return;}
   if(e.repeat)return;
   if(['j','k'].includes(e.key.toLowerCase())){e.preventDefault();const y=window.scrollY+window.innerHeight*.45*(e.key.toLowerCase()==='j'?1:-1);if(lenis.current)lenis.current.scrollTo(y,{duration:.35});else window.scrollTo({top:y,behavior:reduced?'instant':'smooth'});return;}
   if(e.key.toLowerCase()==='m')setPaused(v=>!v);
   if(e.key.toLowerCase()==='n')openPanel('notes');
   if(e.key.toLowerCase()==='f')void toggleFullscreen();
  };window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);
 },[presentation,jump,openPanel,toggleFullscreen,reduced]);
 return <div ref={root} className={`experience ${presentation?'presenting':''} ${paused?'paused':''} ${reduced?'reduced':''}`}>
  <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <div className="ambient" aria-hidden="true"><div className="grid-plane"/><div className="halo"/><div className="orb-fallback"><div/><div/><Shield strokeWidth={.5}/></div>{webgl&&!reduced&&<div className="webgl"><SceneBoundary><DigitalScene state={scene}/></SceneBoundary></div>}<div className="vignette"/></div>
  <header className="header"><a className="brand" href="#inicio" onClick={e=>{e.preventDefault();jump(0);}} aria-label="Voltar ao início"><span className="brand-mark"><Shield size={23} strokeWidth={1.5}/></span><span>INVISIBLE<span className="brand-sub">THREAT / EXPERIENCE</span></span></a><div className="header-center"><span className="status-dot"/> FIEB <span className="slash">/</span> GRUPO 04</div><nav aria-label="Controles"><button className="header-link" onClick={()=>openPanel('references')}><BookOpen size={15}/><span>Referências</span></button><button className="icon-button" aria-label="Configurar integrantes" onClick={()=>openPanel('settings')}><Settings2 size={18}/></button><button className="menu-button" onClick={()=>openPanel('chapters')}><span>Capítulos</span><Menu size={20}/></button></nav></header>
  <main id="conteudo">
   {chapters.map((chapter,i)=><section id={i===0?'inicio':chapter.id} key={chapter.id} className={`chapter chapter-${i+1}`} style={{'--accent':chapter.color} as CSSProperties} aria-labelledby={`title-${i}`}>
    <div className="intro-shell" data-beat={i*2}><div className="cinematic">
     <span className="depth-number" aria-hidden="true">{String(i+1).padStart(2,'0')}</span>
     <div className="intro-copy"><div className="eyebrow"><span className="tiny-line"/>{i===0?'THE INVISIBLE THREAT':chapter.eyebrow}</div>
      {i===0?<><p className="hero-overline">O MUNDO ESTÁ CONECTADO.<br/>E AS AMEAÇAS TAMBÉM.</p><h1 id={`title-${i}`}><span>CIBER</span><span>SEGURANÇA<span className="title-dot">.</span></span></h1></>:<h2 id={`title-${i}`}>{chapter.title.map(line=><span key={line}>{line}</span>)}</h2>}
      <p className="intro-description">{chapter.intro}</p>
      {i===0?<div className="hero-actions"><button className="primary start" onClick={start}>Iniciar apresentação<ArrowUpRight size={18}/></button><span className="duration">6 CAPÍTULOS <span>·</span> 12–15 MIN</span></div>:<p className="chapter-presenter"><span>{names[i]}</span><span> / {chapter.duration}</span></p>}
     </div>
     <div className="scene-annotation" aria-hidden="true"><span className="crosshair">+</span><span>{['SISTEMA CONECTADO','ACESSO NÃO AUTORIZADO','IDENTIDADE VERIFICADA','CONTEÚDO CIFRADO','SEGURANÇA POR DESIGN','PRIVACIDADE POR PRINCÍPIO'][i]}</span><span className="coordinates">{['NÓS / CONEXÕES / DADOS','REQ → API → DB','AUTH / MFA / ACCESS','AES / TLS / HASH','INPUT ≠ INSTRUCTION','HUMAN / SYSTEM'][i]}</span></div>
     <div className="intro-bottom"><span>{String(i+1).padStart(2,'0')} — {chapter.short.toUpperCase()}</span><button onClick={()=>jump(i*2+1)} aria-label={`Explorar capítulo ${i+1}`}><span>{i===0?'ROLE PARA EXPLORAR':'CONTINUE A INVESTIGAÇÃO'}</span><ArrowDown size={16}/></button><span className="section-tag">DS & APLICAÇÕES / 1º ANO</span></div>
    </div></div>
    <div className="lesson" data-beat={i*2+1}>
     <div className="lesson-heading"><span className="eyebrow">{chapter.eyebrow}</span><h3>{chapter.accent}</h3><p>{chapter.quote}</p></div>
     <div className="lesson-columns"><div className="points">{chapter.points.map(([title,text],n)=><div className="point" key={title}><span className="point-number">0{n+1}</span><div><h4>{title}</h4><p>{text}</p></div></div>)}<button className="notes-link" onClick={()=>openPanel('notes')}><BookOpen size={15}/>Roteiro de fala / {chapter.duration}<ArrowUpRight size={14}/></button></div>
      <div className="chapter-experiment">
       {i===0&&<div className="threat-map"><div className="lab-top"><span>SUPERFÍCIE DE ATAQUE</span><Network size={17}/></div><div className="threat-title">A ameaça tem<br/><span>muitas formas.</span></div>{threats.map(([title,text],j)=><details key={title} open={j===0}><summary><span>0{j+1}</span>{title}<span className="detail-plus">+</span></summary><p>{text}</p></details>)}<p className="fine">Selecione uma ameaça para investigar.</p></div>}
       {i===1&&<NetworkLab/>}{i===2&&<PasswordLab/>}{i===3&&<CryptoLab/>}{i===4&&<CodeLab/>}
       {i===5&&<div className="human-system"><div className="lab-top"><span>PRIVACIDADE EM PRÁTICA</span><Users size={18}/></div><div className="people-network" aria-hidden="true">{[0,1,2,3,4].map(n=><span key={n}><Users size={n===2?43:25}/></span>)}<ShieldCheck size={68}/></div><h4>O dado é digital.<br/><span>O impacto é humano.</span></h4><p>Um cadastro escolar fictício precisa da informação necessária para ensinar — não de toda a vida do aluno.</p><div className="principles"><span>FINALIDADE</span><span>NECESSIDADE</span><span>TRANSPARÊNCIA</span><span>SEGURANÇA</span></div></div>}
      </div>
     </div>
    </div>
   </section>)}
   <section className="closing" data-beat="12" aria-labelledby="closing-title"><span className="final-beat" data-beat={reduced?undefined:13}/><div className="closing-inner"><div className="closing-shield"><ShieldCheck size={86} strokeWidth={.8}/></div><span className="eyebrow">UMA RESPONSABILIDADE DE TODOS NÓS</span><h2 id="closing-title"><span className="closing-first">Segurança não é<br/>um recurso extra.</span><span className="closing-second">É parte de um<br/>bom sistema.</span></h2><p>Grupo 4 — Cibersegurança no Desenvolvimento de Sistemas</p><div className="credits">{names.map((name,i)=><span key={i}><small>0{i+1}</small>{name}</span>)}</div><div className="closing-bottom"><span>Obrigado. Vamos conversar?</span><button onClick={()=>openPanel('references')}>Fontes e referências<ArrowUpRight size={17}/></button><button onClick={()=>jump(0)}>Voltar ao início<ArrowRight size={17}/></button></div></div></section>
  </main>
  <aside className="chapter-rail" aria-label="Navegar entre capítulos">{chapters.map((c,i)=><button key={c.id} aria-label={`Capítulo ${i+1}: ${c.short}`} aria-current={active===i?'step':undefined} onClick={()=>jump(i*2)}><span>{String(i+1).padStart(2,'0')}</span><i/></button>)}</aside>
  <footer className="hud"><div className="hud-presenter"><span className="status-dot"/><span>CAPÍTULO {active+1} DE 6</span><span className="hud-name">{names[active]}</span></div><div className="hud-keys">{presentation?'← → CENAS · J/K ROLAR · 1–6 CAPÍTULOS · N ROTEIRO · ESC SAIR':'UMA EXPERIÊNCIA SOBRE O QUE VOCÊ NÃO VÊ'}</div><div className="hud-controls">{presentation&&<><button className="icon-button" aria-label="Ponto anterior" onClick={()=>jump(beatIndex.current-1)}><ChevronLeft size={19}/></button><button className="icon-button" aria-label="Próximo ponto" onClick={()=>jump(beatIndex.current+1)}><ChevronRight size={19}/></button><button className="icon-button" aria-label="Alternar tela cheia" onClick={()=>void toggleFullscreen()}><Expand size={16}/></button></>}<button className="icon-button" aria-label={paused?'Retomar efeitos':'Pausar efeitos'} aria-pressed={paused} onClick={()=>setPaused(!paused)}>{paused?<Play size={15}/>:<Pause size={15}/>}</button>{presentation?<button className="text-button" onClick={()=>{setPresentation(false);if(document.fullscreenElement)void document.exitFullscreen();}}>Sair</button>:<button className="text-button" onClick={start}>Apresentar<Expand size={13}/></button>}</div><div className="global-progress" ref={progressBar} aria-hidden="true"/></footer>
  {fullStatus&&<button className="toast" onClick={()=>setFullStatus('')}>{fullStatus} <X size={15}/></button>}
  <dialog ref={dialog} className="panel" aria-labelledby="panel-title" onClose={()=>returnFocus.current?.focus()}>
   <div className="panel-inner"><div className="panel-header"><span className="eyebrow">INVISIBLE THREAT / GRUPO 04</span><button className="icon-button" aria-label="Fechar painel" onClick={closePanel}><X size={22}/></button></div>
   <h2 id="panel-title">{panel==='chapters'?'Escolha um capítulo.':panel==='references'?'Conhecimento verificável.':panel==='settings'?'Seis vozes. Uma missão.':'Guia do apresentador.'}</h2>
   {panel==='chapters'&&<div className="chapter-menu">{chapters.map((c,i)=><button key={c.id} onClick={()=>{closePanel();jump(i*2);}}><span>0{i+1}</span><div>{c.short}<small>{names[i]} / {c.duration}</small></div><ArrowUpRight size={22}/></button>)}</div>}
   {panel==='references'&&<><p className="panel-description">Fontes oficiais e documentação técnica. Exemplos e dados da apresentação são fictícios. O trabalho escrito em ABNT é uma entrega separada.</p><div className="references">{references.map(([org,title,url])=><a href={url} key={url} target="_blank" rel="noreferrer"><span>{org}</span><div>{title}</div><ArrowUpRight size={18}/></a>)}</div><p className="fine">Fontes consultadas em 19/10/2026. Links externos precisam de conexão.</p></>}
   {panel==='settings'&&<><p className="panel-description">Personalize os nomes para esta sessão. A configuração permanente fica em src/data/presentation.ts.</p><div className="name-fields">{names.map((name,i)=><label key={i}>0{i+1} / {chapters[i].short}<input value={name} maxLength={40} onChange={e=>setNames(current=>current.map((v,j)=>j===i?e.target.value:v))}/></label>)}</div><p className="fine">Teclado no modo apresentação: setas e Page Up/Down avançam entre cenas; 1–6 escolhem capítulos; N abre o roteiro; J/K rolam explicações longas; M pausa efeitos; F alterna tela cheia; Esc sai. Tab e Enter controlam demonstrações.</p></>}
   {panel==='notes'&&<><div className="notes-current"><span className="eyebrow">CAPÍTULO {active+1} / {names[active]} / {chapters[active].duration}</span><h3>{chapters[active].short}</h3><p>{chapters[active].notes}</p></div><p className="fine">Ritmo total sugerido: 12–13 minutos, com até 2 minutos para demonstrações e perguntas. Feche com Esc para continuar.</p></>}
   </div>
  </dialog>
  <noscript><div className="noscript">O conteúdo permanece legível. Ative JavaScript para usar as demonstrações e o modo apresentação.</div></noscript>
 </div>;
}
