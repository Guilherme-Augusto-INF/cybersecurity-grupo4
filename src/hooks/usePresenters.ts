'use client';
import {useCallback,useEffect,useRef,useState} from 'react';
import {presenters} from '../data/presentation';
import {fetchPresenters,parsePresenters,presentersCacheKey} from '../lib/presenters';

export function usePresenters() {
  const [names,setNames] = useState(presenters.map(p=>p.name));
  const [status,setStatus] = useState('Carregando nomes do Supabase…');
  const request = useRef<AbortController|null>(null);
  const locallyEdited = useRef(false);
  const reload = useCallback(async()=>{
    request.current?.abort();
    const controller = new AbortController(); request.current = controller;
    const timeout = setTimeout(()=>controller.abort(),5000);
    setStatus('Carregando nomes do Supabase…');
    try {
      const loaded = await fetchPresenters(controller.signal);
      if (controller.signal.aborted || request.current !== controller) return;
      try { localStorage.setItem(presentersCacheKey,JSON.stringify(loaded.map((name,i)=>({chapter:i+1,name})))); } catch { /* Storage may be disabled. */ }
      if (!locallyEdited.current) setNames(loaded);
      setStatus(locallyEdited.current?'Nomes do banco atualizados. Sua prévia local foi preservada.':'Nomes sincronizados com o Supabase.');
    } catch {
      if (request.current === controller) setStatus('Banco indisponível. Usando nomes locais; a apresentação continua disponível.');
    } finally { clearTimeout(timeout); }
  },[]);
  useEffect(()=>{
    const initialization = setTimeout(()=>{
    try { const cached = parsePresenters(JSON.parse(localStorage.getItem(presentersCacheKey) || 'null')); if (cached) setNames(cached); } catch { /* Invalid cache or private browsing: use defaults. */ }
    void reload();
    },0);
    return()=>{clearTimeout(initialization);request.current?.abort();request.current=null;};
  },[reload]);
  const edit = (index:number,name:string)=>{
    locallyEdited.current=true;
    setNames(current=>current.map((value,i)=>i===index?name:value));
    setStatus('Prévia nesta sessão. Para salvar para todos, edite a tabela no Supabase.');
  };
  const restore = ()=>{locallyEdited.current=false;void reload();};
  return {names,status,edit,restore};
}
