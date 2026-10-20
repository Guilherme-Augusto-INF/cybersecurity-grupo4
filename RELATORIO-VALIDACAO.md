# Relatório final — THE INVISIBLE THREAT

Revisão: 20/10/2026. Grupo 4 — FIEB. Seis capítulos para apresentação oral de 12–15 minutos. Este relatório substitui as limitações e notas da primeira entrega, que ainda não tinha sido inspecionada no navegador.

## Mudanças verificadas

- Cena principal procedural SVG com profundidade, sete formas, 144 nós e 180 conexões, completa sem WebGL. A camada R3F adicional preserva buffers pré-alocados e renderização sob demanda.
- Um controlador global dirige morph, câmera e cor. As formas permanecem estáveis durante a leitura e se transformam entre capítulos. Os controladores concorrentes e a mudança abrupta de cor foram eliminados.
- A superfície de leitura dissolve sobre o fundo, sem a borda horizontal que cortava a cena. Planos próximos e distantes se deslocam em velocidades diferentes.
- Recalcular posições após fontes, mudança do modo apresentação, fullscreen e redimensionamento elimina a frase final incompleta. Medir antes de criar o controlador corrige recarga em posição de rolagem restaurada.
- Removidas legendas duplicadas; editor com partículas atrás do vidro; SQL vulnerável e parametrizado visíveis simultaneamente; textos ampliados para projeção.
- Exemplo fictício de senha, indicador local, MFA e reinícios; AES-GCM real com chave não exportável; simulação da rede sem ataque real. Nenhum dado sensível é coletado.
- Menu móvel com nome acessível; títulos em ordem; legendas de transição com contraste integral. Aviso de fullscreen indisponível fecha automaticamente.
- Título fixo desenhado com contornos vetoriais da Space Grotesk 500, com texto acessível preservado; ele aparece sem aguardar o arquivo da fonte. Inter local usa carregamento opcional e fallback ajustado em conexões lentas. A prioridade de fonte fica no texto de apoio. WebGL só carrega após começar a explorar. Cenas inativas não são pintadas; anotações pequenas do cenário ficam reservadas ao desktop.

## Verificação técnica

| Verificação | Resultado |
| --- | --- |
| TypeScript | Aprovado |
| ESLint | Aprovado |
| Build de produção | Aprovado; exportação estática Next.js |
| Testes automatizados | 12 aprovados |
| Auditoria completa npm | Zero vulnerabilidades reportadas |
| HTML exportado | Seis capítulos, 14 pontos narrativos, sem IDs duplicados |
| Recursos iniciais | 11 referências locais verificadas, nenhuma ausente |

Os testes abrangem autenticação AES-GCM/Unicode/adulteração/chaves, heurística de senha, quatro laboratórios, navegação, progresso legado e continuidade da direção de cena. O teste de continuidade percorre 18.500 posições e fronteiras; o teste SVG percorre morphs nos dois sentidos e movimento reduzido, sem coordenadas inválidas. Testes de componentes usam Happy DOM e não substituem renderização real.

## Verificação no navegador de produção

- Aberturas, diagramas, quatro experiências, reinícios, comparação SQL e recuperação criptográfica inspecionados.
- Rolagem normal, reversa, transição do último capítulo para o escudo, End e Page Up verificados. O título vetorial foi revalidado nos seis viewports e seu nome acessível foi confirmado. No encerramento, a segunda frase atinge opacidade 1 e o retorno restaura a primeira.
- Recarga com rolagem restaurada repetida após corrigir a ordem de inicialização, mantendo os seis capítulos funcionais.
- Modo apresentação e navegação de capítulos testados. Quando fullscreen foi negado pelo navegador remoto, a apresentação continuou utilizável. Fullscreen físico no projetor não foi certificado.
- Nenhum erro da aplicação na revisão final observada. O navegador de teste registrou mensagens de uma extensão externa de metadados; foram distinguidas de erros do site.

## Responsividade — penúltima etapa

Viewports CSS reais em iframe, com inspeção visual e medidas de DOM:

| Viewport | Página sem overflow horizontal | Títulos e código sem cortes |
| --- | --- | --- |
| 1920×1080 | Sim | Sim |
| 1366×768 | Sim | Sim |
| 768×1024 | Sim | Sim |
| 390×844 | Sim | Sim |
| 360×800 | Sim | Sim |
| 320×667 | Sim | Sim |

O encerramento e seus controles foram vistos em 390×844 e 320×667. O painel `/revisao-layout` permite repetir essas verificações. A moldura é escalada para caber no monitor de teste; as media queries recebem o viewport indicado.

## PageSpeed — última etapa

Último relatório público: https://pagespeed.web.dev/analysis/https-cybersecurity-grupo4-vercel-app/5d5hkcsgsv?form_factor=mobile

| Métrica | Celular / 4G lento | Desktop |
| --- | --- | --- |
| Desempenho | **98/100** | **100/100** |
| Acessibilidade | 100/100 | 100/100 |
| Boas práticas | 100/100 | 100/100 |
| SEO | 100/100 | 100/100 |
| FCP | 1,2 s | 0,3 s |
| LCP | 2,3 s | 0,5 s |
| Total Blocking Time | 40 ms | 30 ms |
| CLS | 0,002 | 0,008 |
| Speed Index | 1,2 s | 0,5 s |

Lighthouse 13.5.0, Chromium 153, captura de 20/10/2026 às 06:48 BRT. Durante as iterações houve resultados móveis de 92 a 98; a tabela apresenta a última medição, sem selecionar a maior nota. A incorporação experimental de CSS foi comparada, não apresentou ganho de pontuação e foi removida. A configuração final usa CSS externo e a versão estável do framework. O desenho inicial e o primeiro frame hidratado agora usam exatamente a mesma projeção, com verificação de regressão.

O gargalo móvel restante é o tempo de renderização do subtítulo em rede limitada, além do CSS e JavaScript de inicialização apontados pelo Lighthouse. **O objetivo de 100 em desempenho móvel não foi atingido.**

São medições de laboratório Lighthouse, não garantia de velocidade em todos os dispositivos. A página ainda não tem dados de campo CrUX suficientes. Não foi medido FPS ou perfil prolongado de memória/GPU. O resultado de acessibilidade automatizada não certifica conformidade WCAG integral nem substitui teste assistivo com leitor de tela.

## Avaliação crítica

| Critério | Nota / 10 | Evidência e limite |
| --- | --- | --- |
| Direção artística | 9,5 | Sete cenas próprias, hierarquia e composição revistas; julgamento editorial |
| Parallax | 9,5 | Controle único, profundidade e fronteiras contínuas; FPS não medido |
| Animações e transições | 9,5 | Entradas, saída, reverso e dissoluções inspecionados |
| Conteúdo pedagógico | 9,5 | Seis roteiros e referências oficiais; falta ensaio oral com o grupo |
| Interatividade | 10 no escopo testado | Quatro laboratórios locais com execução, recuperação e reinício verificados |
| Responsividade | 9,5 | Seis viewports CSS reais; sem certificação de todos os aparelhos físicos |
| Acessibilidade | 9,5 | 100 Lighthouse e teclado; sem auditoria integral com leitor de tela |
| Desempenho | 9,8 | Último PageSpeed móvel 98 e desktop 100; sem perfil de FPS/GPU |
| Estabilidade | 9,5 | Lint, tipos, build, 12 testes e recarga restaurada aprovados; sem ensaio prolongado |
| Qualidade geral | **9,6** | Resultado observado, sem declarar perfeição em critérios não comprovados |

A meta de nota 10 em todos os critérios ainda não foi comprovada. Para fechar essa avaliação faltam atingir a meta móvel, medir fluidez/memória no hardware real e realizar ensaio cronometrado com o projetor e teste assistivo.

As notas de direção e acabamento são julgamento editorial limitado às cenas observadas. Não representam uma certificação externa. A apresentação oral de 12–15 minutos ainda precisa de ensaio com os seis integrantes e o projetor real.

## Publicação e uso

Deploy de produção `dpl_sLcCb3z4xUAPJzBxKkBvXkDqGNEX`: **READY**.

URL verificada no navegador: https://cybersecurity-grupo4.vercel.app/

O código é consolidado em `Guilherme-Augusto-INF/cybersecurity-grupo4`, preservando o histórico e as correções anteriores de renderização sob demanda, fullscreen e teclado. As atualizações de relatório posteriores ao build não alteram o aplicativo publicado.

Código-fonte, lockfile, README, configuração Vercel e testes acompanham a entrega. A pasta `out/` do pacote é pré-compilada: `node scripts/serve.mjs` permite apresentação local sem instalar dependências, com Node.js e navegador. Os links de fontes exigem internet. Os nomes continuam editáveis em `src/data/presentation.ts` ou no painel da sessão. O trabalho escrito em ABNT é uma entrega separada.
