# Integrantes — Supabase

Projeto criado: Ciberseguranca - Grupo 4 (`leqgkgrnctunqoimaqfl`), organização Guilherme Augusto, região sa-east-1.

## Como substituir os nomes

Abra https://supabase.com/dashboard/project/leqgkgrnctunqoimaqfl/editor e selecione `public.presenters`. Troque `name` em cada uma das seis linhas e salve. `chapter` identifica o apresentador e deve continuar de 1 a 6. Limite: 40 caracteres por nome.

No site, abra o botão Configurar integrantes no cabeçalho e escolha **Recarregar nomes do banco**. Reabrir a página também busca os dados. Não precisa editar código ou fazer novo deploy.

A edição permanente exige sua conta no painel Supabase. Os campos de nomes dentro do site são uma prévia de sessão. Visitantes têm somente leitura. Nomes não fornecidos foram mantidos como Integrante 1 a Integrante 6.

## Validação

- Os seis registros foram consultados por SQL e pela API REST usando a chave publishable.
- RLS habilitado. Papéis anon e authenticated: SELECT permitido; INSERT, UPDATE e DELETE negados.
- PATCH pela API pública retornou HTTP 401, código Postgres 42501 (permission denied), sem alteração.
- Atualização administrativa testada dentro de transação com ROLLBACK; nomes originais confirmados após teste.
- Supabase Security Advisors: nenhuma observação.
- Novos testes: lista completa/ordenada, rejeição de lista duplicada/incompleta/inválida, falha HTTP, sinal de cancelamento, cache offline, edição local preservada durante resposta tardia e restauração do banco.
- Lint, TypeScript e 15 testes passaram.

## Arquitetura

Sem dependência nova: fetch nativo, consulta não bloqueante após hidratação e timeout de 5 segundos. A chave publishable é intencionalmente pública e não concede escrita. Não existe chave service_role no código. O último conjunto válido de nomes fica no navegador; se não existir, os nomes padrão continuam disponíveis. O cache ajuda em visitas posteriores sem conexão, mas o carregamento inicial do site ainda requer que seus arquivos estejam disponíveis. As demonstrações não enviam dados ao banco.

`supabase/schema.sql` é uma referência para reproduzir o esquema em projeto novo, não uma migração para executar sobre esta tabela existente. Não reexecute o INSERT para substituir nomes.
