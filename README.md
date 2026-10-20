# THE INVISIBLE THREAT

> **Revisão pós-Work:** este pacote contém alterações de código para parallax, continuidade do morph, navegação e testes. Ele **ainda não foi compilado nem publicado** após essas alterações. Leia `CONTINUACAO-AUDITORIA.md`. As métricas e o deploy registrados nos outros relatórios pertencem à versão original recebida.

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

Após `npm run build`, o projeto gera um site estático em `out/`. Esta revisão **não inclui o `out/` antigo**, para impedir o uso inadvertido de uma versão compilada antes das correções. Execute o build antes de iniciar **`node scripts/serve.mjs`**, que servirá a versão nova em **http://localhost:4173**. Não abra `index.html` diretamente por `file://`: módulos e Web Crypto precisam de um servidor local. Fontes, código e cenas são locais; apenas links de referências precisam da internet.

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

São 14 pontos narrativos: abertura e explicação de cada capítulo, mais duas frases de encerramento. Com movimento reduzido, o encerramento mostra as duas frases juntas, totalizando 13 pontos. Em telas menores, use J/K para rolar as explicações e ler todo o conteúdo antes de avançar; no celular, use a rolagem de toque.

## Personalizar

Edite `src/data/presentation.ts`: `presenters` contém os seis nomes; `chapters` contém títulos, explicações, duração e roteiros de fala. O botão de configurações também permite editar nomes durante a sessão, sem persistir dados. Substitua “Integrante 1” a “Integrante 6” antes da apresentação.

Paleta, composição e adaptações estão em `src/app/globals.css`. Metadados em `src/app/layout.tsx`; ícone em `src/app/icon.svg`; imagem de compartilhamento em `public/og.png`. Na Vercel, a URL base é obtida de `VERCEL_PROJECT_PRODUCTION_URL`. Em outra hospedagem, ajuste o fallback de `metadataBase`.

## Arquitetura

- `src/components/Experience.tsx`: navegação, diálogos, modo apresentação e integração GSAP/Lenis.
- `src/components/DigitalScene.tsx`: cena R3F carregada separadamente; 900 pontos, geometrias procedurais e morph contínuo entre rede, fechadura, hélice, código, pessoas e escudo.
- `src/components/Labs.tsx`: rede fictícia, verificador de características de senha, AES-GCM e comparação SQL.
- `src/lib/crypto.ts`: cifragem e recuperação reais pela Web Crypto API.
- `src/lib/password.mjs`: heurística educativa, sem envio ou armazenamento.
- `src/lib/navigation.ts`: mapeamento dos pontos de parada.
- `src/data/presentation.ts`: conteúdo, integrantes e fontes oficiais.
- `tests/`: testes de componentes com DOM simulado e de criptografia/navegação.
- `scripts/serve.mjs`: servidor estático para apresentação local; `scripts/dev.mjs`: inicialização de desenvolvimento compatível com supervisores de prévia.

## Motion, acessibilidade e desempenho

As aberturas usam **CSS sticky para pinning**, sem capturar a rolagem. ScrollTrigger controla progresso, profundidade e coreografia; a mesma cena WebGL permanece entre capítulos e faz morph geométrico. Lenis acompanha o ticker GSAP e é removido na limpeza; não é ativado com movimento reduzido ou ponteiro de toque.

DPR limitado a 1–1,5. A cena pesada é carregada somente em telas acima de 820 px, com WebGL2 e sem preferência de movimento reduzido. SVG/CSS fornece alternativa quando WebGL não está disponível. O render é sob demanda; o movimento ambiente discreto é limitado a 30 atualizações/s e a rolagem invalida frames independentemente. O controle de pausa interrompe as atualizações ambientes. A aba oculta também interrompe essas atualizações. Não há promessa de 60 FPS: a taxa precisa ser medida no equipamento da apresentação.

Timelines, eventos, ticker, Lenis, timers e buffers próprios são limpos no desmontar. Os objetos R3F declarativos são descartados por seu ciclo de vida. O limite de erro da cena mantém o conteúdo acessível em caso de falha WebGL. Diálogos nativos mantêm foco, aceitam Esc e devolvem foco ao controle de origem. Há link de salto, nomes de controles, foco visível, respostas em regiões de status, hierarquia de títulos e alternativa para movimento reduzido. A conformidade WCAG completa não foi auditada no navegador.

## Laboratórios

1. **Rede:** estados ilustrativos; não há requisição para alvo, SQL executado ou dados pessoais reais.
2. **Senha:** avalia comprimento, alguns padrões comuns e diversidade. Não estima tempo de quebra, não consulta vazamentos e não atesta segurança. Digite somente exemplos fictícios. O valor não é enviado, salvo nem registrado.
3. **Criptografia:** AES-256-GCM, chave não exportável, IV aleatório de 96 bits para cada cifragem, recuperação e integridade pela Web Crypto. Estado apenas na memória. É demonstração didática, não um cofre para segredos. HTTPS ou localhost é obrigatório.
4. **Código:** pseudocódigo PostgreSQL. Concatenação é comparada a parâmetros `$1`, com valor separado; não há banco conectado. Parâmetros não substituem autorização.

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

**Atenção:** esta URL continua servindo a versão anterior, não a revisão pós-Work. O build remoto READY e as respostas HTTP 200 documentadas se referem à entrega original. Faça novo build, deploy e validação antes de considerar a revisão publicada.
