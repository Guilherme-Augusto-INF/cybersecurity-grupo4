> **Registro histórico:** este relatório pertence à versão original do Work. Não comprova testes, build ou deploy da revisão descrita em `CONTINUACAO-AUDITORIA.md`.

# Relatório de validação — THE INVISIBLE THREAT

Data: 19/10/2026. Escopo: site escolar do Grupo 4, seis integrantes, Cibersegurança no Desenvolvimento de Sistemas. Esta entrega contém implementação completa, código-fonte, versão estática pré-compilada, README e roteiro de fala por capítulo.

## Resultado comprovado

| Verificação executada | Resultado |
| --- | --- |
| TypeScript (`npm run typecheck`) | Passou, sem erros |
| ESLint (`npm run lint`) | Passou, sem erros ou avisos no código do projeto |
| Build (`npm run build`) | Passou, Next.js 16.4.2, exportação estática |
| Testes automatizados (`npm test`) | 9 testes passaram |
| Auditoria completa de dependências (`npm audit`) | 0 vulnerabilidades reportadas após a remoção da cadeia de lint afetada |
| Estrutura do HTML exportado | 6 capítulos e 14 pontos narrativos |
| Assets iniciais do HTML | 10 referências locais verificadas; nenhum arquivo ausente |
| IDs HTML | Nenhum ID duplicado no HTML exportado |
| Fontes e recursos | Fontes empacotadas localmente; nenhuma CDN exigida durante a apresentação |
| Deploy Vercel | Ver estado final no registro abaixo |

A saída estática ocupa aproximadamente 2,93 MB sem compressão. Esse número inclui todos os arquivos, inclusive chunks 3D carregados sob demanda, HTML, fontes e metadados; não é a transferência inicial nem uma métrica de Core Web Vitals.

## Cobertura dos nove testes

1. AES-GCM recupera texto em português com Unicode; chave não exportável e IV de 12 bytes.
2. Duas cifragens geram IVs/chaves independentes; recuperar com outra chave falha.
3. Adulterar o conteúdo cifrado é rejeitado pela autenticação do AES-GCM.
4. Heurística de senha identifica padrões comuns e distingue comprimento/diversidade.
5. Componente da rede avança pelos quatro passos, bloqueia com defesa e reinicia.
6. Componente de senha responde ao campo, ativa segundo fator e reinicia sem persistência.
7. Comparação SQL alterna concatenação/parâmetros e restaura o exemplo inicial.
8. Laboratório de criptografia cifra, recupera e reinicia usando a Web Crypto real.
9. Mapeamento de teclado avança/retrocede em pontos definidos, escolhe capítulos, respeita limites e adapta o último ponto ao movimento reduzido.

Os testes de componentes usam React e Happy DOM. Eles verificam comportamento de estado e eventos em um DOM simulado, **não substituem testes em um navegador com renderização, WebGL e tela cheia**. O teste de navegação verifica o mapeamento das teclas; a integração do teclado com fullscreen e foco real continua pendente de ensaio.

## Correções realizadas antes da entrega

- Eliminado bloqueio das setas quando o botão de início permanece com foco.
- Repetições de teclas e avanços simultâneos durante uma transição não disparam avanços extras; teclas de navegação têm comportamento padrão cancelado nesse caso.
- Editar campos de demonstração não dispara mudança de capítulo.
- J/K permitem rolar explicações longas apenas pelo teclado, sem pular o restante do conteúdo em telas baixas.
- Separadas as pastas de build de desenvolvimento e produção; artefatos gerados não entram no lint.
- Corrigida a inicialização de desenvolvimento para aceitar o supervisor de prévia.
- Adicionado servidor estático para execução local; `next start` não é usado com `output: 'export'`.
- Adicionada imagem Open Graph PNG e base de URL definida pela Vercel.
- Encerramento passa de uma frase à outra em uma cena sticky; movimento reduzido mostra ambas sem animação.
- Estado criptográfico é invalidado ao editar/reiniciar; operações assíncronas antigas não restauram resultados descartados.
- Senha permanece em memória local; indicador não calcula um tempo de quebra nem promete segurança.
- Exemplos SQL são apenas texto, sem banco, execução ou alvo real.
- Adicionada alternativa SVG/CSS e isolamento de erros para WebGL.
- Removida a cadeia de dependências de lint afetada pelo alerta em braces; regras explícitas de TypeScript, Hooks e acessibilidade mantidas.
- Região de código identificada e focável para rolagem por teclado; diálogos fecham por botão ou Esc.

## Conteúdo pedagógico

Divisão em seis partes com duração estimada de 2 minutos por pessoa, e 2–3 minutos para a conclusão. Cada capítulo tem roteiro acessível pelo botão e pela tecla N em modo apresentação. Total estimado de 12–13 minutos de falas, com margem até 15 minutos para interações e perguntas. Essa duração é uma orientação editorial; **não foi cronometrada em um ensaio oral**.

Conceitos validados com OWASP, NIST, ANPD, texto oficial da LGPD e MDN. O material diferencia autenticação/autorização, SQL Injection/XSS, criptografia/hashing, fatores de MFA e princípios da LGPD. Não afirma que a LGPD exige uma ferramenta específica. Não usa estatísticas ou casos reais inventados. A lista de fontes está disponível no site.

## Limites da validação visual e de desempenho

A tentativa de conexão com o navegador local expirou. A prévia gerenciada iniciou, mas o navegador de teste bloqueou a observação pela política de acesso do ambiente. O bloqueio não foi contornado. Por isso, **não foram comprovados**:

- Composição real em 1920×1080, 1366×768 e telas móveis.
- Ausência de colisões, recortes ou sobreposições em todos os quadros e transições.
- Rolagem rápida/reversa, pinning e integração Lenis/ScrollTrigger no navegador real.
- Fullscreen, foco nativo de diálogos e uso integral do notebook sem mouse.
- Funcionamento WebGL por GPU/dispositivo, contexto perdido e comportamento após longas sessões.
- FPS, Core Web Vitals, perfil de memória e vazamentos de GPU.
- Contraste medido, leitor de tela, zoom e conformidade WCAG integral.

O código inclui adaptações, limites de DPR, alternativa móvel, redução de movimento e limpeza de recursos. Essas medidas são verificáveis por inspeção do código, mas não equivalem a resultados empíricos de desempenho. O movimento ambiente é limitado a 30 atualizações/s; frames de rolagem são solicitados separadamente. Não se afirma ter medido 60 FPS.

## Avaliação de qualidade

Notas máximas não são justificáveis sem inspeção visual e ensaio. As notas abaixo são **provisórias e limitadas ao que foi observado em código e testes**. “N/V” significa que não há evidência visual suficiente para atribuir uma nota honesta.

| Critério | Nota | Base e limite |
| --- | --- | --- |
| Direção artística | N/V | Paleta, tipografia, cena procedural e composição implementadas; não vistas renderizadas |
| Qualidade do parallax | N/V | Scrubbing, sticky, profundidade e morph implementados; fluidez real não observada |
| Animações e transições | N/V | Timelines e continuidade implementadas; quadros de transição não inspecionados |
| Conteúdo pedagógico | 8,5/10 | Fontes oficiais e distinções técnicas corretas; requer ensaio com o grupo |
| Interatividade | 8,5/10 | Quatro demonstrações passaram em testes de componentes; falta validação humana no navegador |
| Responsividade | N/V | Breakpoints e alternativas implementados; falta inspeção por viewport |
| Acessibilidade | 7/10 | Semântica, foco, teclado e redução de movimento previstos; falta auditoria assistiva |
| Desempenho | N/V | Lazy loading e limites de recursos implementados; sem perfil real ou CWV |
| Estabilidade | 8/10 | Tipos, lint, build e 9 testes aprovados; integração visual não comprovada |
| Qualidade geral | N/V | A avaliação depende da experiência renderizada e do ensaio no projetor |

## Ensaio final no equipamento

1. Substituir os seis nomes no arquivo de configuração ou no painel da sessão.
2. Executar o site localmente ou abrir a URL publicada; maximizar a janela e usar Iniciar apresentação.
3. Percorrer as aberturas e as explicações, avançar e retroceder, testar Home/End e 1–6.
4. Confirmar que os títulos cabem e as explicações são legíveis à distância.
5. Executar e reiniciar as quatro experiências usando Tab e Enter.
6. Abrir o roteiro com N, fechar com Esc, pausar com M e alternar tela cheia com F.
7. Conferir as duas frases finais; testar novamente com movimento reduzido ativado no sistema.
8. Ensaiar as falas por 12–15 minutos e confirmar a versão local sem internet.

O trabalho escrito em ABNT permanece uma entrega separada.

## Registro de publicação

Primeira publicação concluída na Vercel com estado READY. URL: https://cybersecurity-grupo4.vercel.app

Foi confirmada resposta HTTP 200 com HTML em português, título correto, seis capítulos e metadados Open Graph com a URL de produção. Isso verifica entrega HTTP, não execução de animações ou hidratação no navegador.

A primeira tentativa de deploy falhou por configurar `out` como output do adaptador Next.js. A configuração correta usa `.next`; o adaptador detecta `output: 'export'` e publica o conteúdo estático de `out/`. Essa configuração foi incluída em `vercel.json`.

A auditoria completa revelou cinco alertas altos propagados por uma única dependência de desenvolvimento (`braces`, via `fast-glob` do preset Next para ESLint). O preset foi removido e substituído por configuração explícita de TypeScript, React Hooks e JSX Accessibility, eliminando essa cadeia. O site não tinha essa dependência em seu código de produção.

A configuração sem a cadeia vulnerável passou novamente por lint, TypeScript, nove testes e build. A auditoria completa voltou a reportar zero vulnerabilidades. A publicação dessa revisão foi concluída; a revisão final acrescenta rolagem J/K e composição compacta para projeção, com a mesma verificação técnica.

Não foi criado repositório remoto: a conexão disponível permite trabalhar com repositórios existentes, mas não expôs criação de repositórios. O código-fonte e o lockfile acompanham a entrega para importação posterior.


### Confirmação da revisão final

Deploy `dpl_CNHQKeiqTBs2z4xUyDLUJFWGRbh1`: **READY**, produção em https://cybersecurity-grupo4.vercel.app. Verificados por HTTP: página principal 200, CSS 200 e JavaScript do aplicativo 200; título e seis capítulos corretos. Lint sem avisos, TypeScript e build da revisão final aprovados. A auditoria completa reportou zero vulnerabilidades após a correção da dependência de desenvolvimento. Os nove testes de comportamento e criptografia passaram. A inspeção visual, hidratação, fullscreen e FPS em navegador continuam não verificados pelas limitações já descritas.
