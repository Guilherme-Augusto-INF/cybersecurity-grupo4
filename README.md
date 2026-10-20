# THE INVISIBLE THREAT

Experiência de apresentação do Grupo 4, FIEB — 1º ano do Técnico em Informática. Tema: Cibersegurança no Desenvolvimento de Sistemas. Seis capítulos, seis apresentadores, duração oral sugerida de 12 a 15 minutos.

## Executar

Requisito: Node.js 22 ou 24 LTS e npm.

```bash
npm ci
npm run dev
```

Abra http://localhost:4173. Para produção:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

O projeto gera um site estático em `out/`. O pacote de entrega inclui uma cópia pré-compilada: para apresentar sem internet, extraia o ZIP, entre na pasta do projeto e execute **`node scripts/serve.mjs`**. Isso dispensa instalar dependências quando `out/` já estiver presente; só precisa de Node. Abra **http://localhost:4173**. Não abra `index.html` diretamente por `file://`: módulos e Web Crypto precisam de um servidor local. Fontes, código e cenas são locais; apenas links de referências precisam da internet.

## Apresentar pelo teclado

Use Tab até **Iniciar apresentação** e pressione Enter. Se tela cheia for negada, o modo apresentação continua funcionando. F alterna tela cheia novamente. O navegador controla a saída nativa de tela cheia.

| Tecla | Ação no modo apresentação |
| --- | --- |
| →, ↓, Page Down | Próximo ponto narrativo |
| ←, ↑, Page Up | Ponto anterior |
| 1–6 | Abertura de um capítulo |
| Home / End | Primeiro / último ponto |
| J / K | Rolar explicações para baixo / cima, sem mouse |
| N | Abrir roteiro do apresentador |
| M | Pausar / retomar movimentos ambientes |
| F | Alternar tela cheia |
| Esc | Fechar painel; fora de painel, sair do modo apresentação |
| Tab / Shift+Tab, Enter / Espaço | Navegar e ativar controles e experiências |

Eventos de teclado em campos de texto não avançam a apresentação. Repetições de tecla e avanços durante a transição são ignorados. As setas permanecem disponíveis quando o botão de início está com foco. O modo não avança sozinho: o ritmo é controlado pelo grupo.

As superfícies de leitura entram e saem com degradê sobre a cena persistente; os textos técnicos pequenos do cenário ficam reservados ao desktop. São 14 pontos narrativos: abertura e explicação de cada capítulo, mais duas frases de encerramento. Com movimento reduzido, o encerramento mostra as duas frases juntas, totalizando 13 pontos. Em telas menores, use J/K para rolar as explicações e ler todo o conteúdo antes de avançar; no celular, use a rolagem de toque.

## Personalizar

Edite `src/data/presentation.ts`: `presenters` contém os seis nomes; `chapters` contém títulos, explicações, duração e roteiros de fala. O botão de configurações também permite editar nomes durante a sessão, sem persistir dados. Substitua “Integrante 1” a “Integrante 6” antes da apresentação.

Paleta e base estão em `src/app/globals.css`; a direção visual, cenas e adaptações finais estão em `src/app/experience-v2.css`. Metadados em `src/app/layout.tsx`; ícone em `src/app/icon.svg`; imagem de compartilhamento em `public/og.png`. Na Vercel, a URL base é obtida de `VERCEL_PROJECT_PRODUCTION_URL`. Em outra hospedagem, ajuste o fallback de `metadataBase`.

## Arquitetura

- `src/components/HeroTitle.tsx`: título vetorial com nome acessível, gerado a partir da Space Grotesk 500.
- `src/components/Experience.tsx`: navegação, diálogos, modo apresentação e integração GSAP/Lenis.
- `src/components/NarrativeScene.tsx`: cena principal SVG com projeção 3D procedural, 144 nós, 180 conexões, sete formas e morph contínuo, renderizada também no servidor.
- `src/components/DigitalScene.tsx`: camada adicional R3F sob demanda, com 900 pontos; carregada após começar a explorar em desktops compatíveis.
- `src/components/Labs.tsx`: rede fictícia, verificador de características de senha, AES-GCM e comparação SQL.
- `src/lib/crypto.ts`: cifragem e recuperação reais pela Web Crypto API.
- `src/lib/password.mjs`: heurística educativa, sem envio ou armazenamento.
- `src/lib/navigation.ts`: mapeamento dos pontos de parada.
- `src/lib/scene-progress.ts`: direção contínua da cena, câmera e transições entre capítulos.
- `src/data/presentation.ts`: conteúdo, integrantes e fontes oficiais.
- `tests/`: testes de componentes com DOM simulado e de criptografia/navegação.
- `scripts/serve.mjs`: servidor estático para apresentação local; `scripts/dev.mjs`: inicialização de desenvolvimento compatível com supervisores de prévia.

## Motion, acessibilidade e desempenho

As aberturas usam **CSS sticky para pinning**, sem capturar a rolagem. ScrollTrigger controla progresso, profundidade e coreografia; a mesma cena vetorial com profundidade permanece entre capítulos e faz morph geométrico por um único controlador global (`src/lib/scene-progress.ts`), mantendo a forma durante a leitura e interpolando nas passagens. Lenis acompanha o ticker GSAP e é removido na limpeza; não é ativado com movimento reduzido ou ponteiro de toque.

DPR limitado a 1–1,5. A camada WebGL é carregada somente depois dos primeiros 80 px de exploração, em telas acima de 820 px com WebGL2 e sem preferência de movimento reduzido. A cena SVG principal permanece completa sem GPU. As duas cenas atualizam sob demanda, em resposta à rolagem, sem um timer contínuo de renderização. O título fixo usa contornos SVG da Space Grotesk e mantém texto acessível para leitores de tela. Inter local recebe prioridade e usa `font-display: optional`: em rede lenta, um fallback ajustado permite ler sem troca tardia de letras. As outras fontes carregam sem preload. A projeção inicial renderizada no servidor coincide com o primeiro frame do cliente. As posições narrativas são armazenadas no refresh para evitar medir todos os pontos em cada frame. Não há promessa de 60 FPS: a taxa precisa ser medida no equipamento da apresentação.

Timelines, eventos, ticker, Lenis, timers e buffers próprios são limpos no desmontar. Os objetos R3F declarativos são descartados por seu ciclo de vida. O limite de erro da cena mantém o conteúdo acessível em caso de falha WebGL. Diálogos nativos mantêm foco, aceitam Esc e devolvem foco ao controle de origem. Há link de salto, nomes de controles, foco visível, respostas em regiões de status, hierarquia de títulos e alternativa para movimento reduzido. A auditoria automatizada e as verificações manuais constam do relatório; não equivalem a certificação WCAG integral.

## Laboratórios

1. **Rede:** estados ilustrativos; não há requisição para alvo, SQL executado ou dados pessoais reais.
2. **Senha:** avalia comprimento, alguns padrões comuns e diversidade. Não estima tempo de quebra, não consulta vazamentos e não atesta segurança. Digite somente exemplos fictícios. O valor não é enviado, salvo nem registrado.
3. **Criptografia:** AES-256-GCM, chave não exportável, IV aleatório de 96 bits para cada cifragem, recuperação e integridade pela Web Crypto. Estado apenas na memória. É demonstração didática, não um cofre para segredos. HTTPS ou localhost é obrigatório.
4. **Código:** dois painéis simultâneos com destaque interativo, empilhados no celular; pseudocódigo PostgreSQL. Concatenação é comparada a parâmetros `$1`, com valor separado; não há banco conectado. Parâmetros não substituem autorização.

Nenhuma API paga, login, banco de dados ou segredo de produção é necessário.

## Vercel

O projeto é compatível com exportação estática e não precisa de servidor Next em produção. Importe um repositório com este conteúdo na Vercel e use:

- Framework: **Next.js**, com detecção de `output: 'export'`.
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory na Vercel: **padrão do framework (`.next`)**. O adaptador Next detecta a exportação e publica os arquivos de `out/`; não configure `out` como pasta do build Next na Vercel.
- Node.js: 24.x ou 22.x.
- Variáveis secretas: nenhuma.

Alternativa pelo terminal, dentro da pasta extraída e usando sua conta Vercel:

```bash
npx vercel login
npx vercel link
npx vercel deploy --prod
```

Confirme que o projeto vinculado é o desta apresentação. Não use um vínculo de outro projeto. O pacote não inclui tokens ou credenciais. O deploy realizado nesta entrega e as limitações de validação estão em `RELATORIO-VALIDACAO.md`.

## Antes de apresentar

Ensaiar a 1366×768 ou 1920×1080 no notebook/projetor real. Conferir títulos, iniciar, navegar com setas, ativar cada laboratório, reiniciar, usar Esc e testar movimento reduzido. Fazer ao menos um ensaio de 12–15 minutos. O roteiro no painel N fornece a divisão de tempo de cada pessoa. Um único operador pode controlar toda a apresentação.

## Fontes

OWASP (SQL Injection, XSS, Password Storage), NIST SP 800-63B-4, ANPD, texto oficial da LGPD e MDN Web Crypto. Os links estão no painel Referências e em `src/data/presentation.ts`. A apresentação não é uma entrega escrita em ABNT.

## Site publicado

https://cybersecurity-grupo4.vercel.app

Build remoto READY e entrega HTTP 200 confirmados. Consulte o relatório para a cobertura dos testes e os limites da auditoria visual.

## Revisão de layout

`/revisao-layout` abre um painel isolado de QA com iframes de viewport real em 1920×1080, 1366×768, 768×1024, 390×844, 360×800 e 320×667. O painel não aparece no fluxo da apresentação. Verifique cortes, diálogos e código ao alterar conteúdo ou fontes. O scaling do painel só encaixa a prévia na tela; as media queries recebem a dimensão selecionada.

## Auditoria desta revisão

12 testes, lint, TypeScript e build aprovados; auditoria npm sem vulnerabilidades reportadas. Último PageSpeed: desempenho 100 desktop e 98 celular; acessibilidade, boas práticas e SEO 100 em ambos. Nota editorial geral: 9,6/10, com os limites detalhados em `RELATORIO-VALIDACAO.md`. A meta de 10 em todos os critérios ainda não está comprovada.

Para regenerar apenas os contornos do título, `python3 scripts/generate-title.py` lê a fonte instalada pelo npm. Esse utilitário de manutenção usa Python com `fontTools`; ele não é necessário para instalar, compilar ou apresentar o site.
