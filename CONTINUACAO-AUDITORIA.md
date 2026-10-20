# Continuação da auditoria — pós-Work

Este documento registra as alterações feitas sobre o ZIP recebido. O relatório `RELATORIO-VALIDACAO.md` e o JSON `VALIDACAO.json` **descrevem a versão original entregue pelo Work**, não constituem novos resultados desta revisão.

## Melhorias no código-fonte

1. **Rolagem/WebGL:** a posição de morph 0–6 agora tem um único controlador global, interpolado monotonamente por `sceneProgressAt`. Removidos os gatilhos conflitantes dos capítulos e encerramento; a cena final não retorna ao estágio 5 ao entrar na conclusão.
2. **Parallax:** profundidade de quatro planos com deslocamentos independentes (número gigante, anotação técnica, painel inferior e título), sem introduzir modelos/recursos WebGL pesados. Scrubbing com resposta mais próxima da rolagem.
3. **Modo apresentação:** iniciar a sessão enquanto fullscreen já está ativo não desliga o fullscreen.
4. **Teclado:** alvo de eventos validado antes de `closest`; setas em `summary` não são sequestradas da interação de um detalhe.
5. **Acessibilidade:** barra de progresso visual explicitamente decorativa para leitores de tela.
6. **Regressão:** teste unitário da continuidade e monotonicidade do progresso da cena.

## Limitações honestas

- O navegador gerenciado bloqueou a navegação em `127.0.0.1`, impedindo inspeção visual de frame, GPU, sobreposições, projeção e rolagem real.
- A instalação de dependências não foi possível no ambiente (acesso ao registro npm indisponível). Portanto, lint, typecheck do **projeto completo**, testes React e build de produção **não foram reexecutados** nesta revisão.
- O build pré-compilado do ZIP original não inclui estas alterações de código. Esta revisão deve ser compilada (`npm ci && npm run build`) antes de deploy; por isso, a distribuição atualizada não inclui `out/` antigo.
- Nenhum deploy na Vercel foi realizado. O site publicado permanece como estava antes desta revisão até receber o código alterado.

## Verificação recomendada após `npm ci`

```sh
npm run typecheck
npm run lint
npm test
npm run build
```

Depois, testar no navegador nas resoluções 1366×768 e 1920×1080: rolagem lenta/reversa na fronteira entre o capítulo 6 e o encerramento, avanço com teclado, fullscreen, reexecução de laboratórios e prefers-reduced-motion. **Responsividade completa penúltimo; PageSpeed por último**, conforme a prioridade do grupo.
