export const presenters = [
  { name: 'Integrante 1', chapter: 1 }, { name: 'Integrante 2', chapter: 2 },
  { name: 'Integrante 3', chapter: 3 }, { name: 'Integrante 4', chapter: 4 },
  { name: 'Integrante 5', chapter: 5 }, { name: 'Integrante 6', chapter: 6 },
];
export const chapters = [
  { id: 'conexoes', short: 'O mundo conectado', eyebrow: '01 / A SUPERFÍCIE', title: ['CIBER', 'SEGURANÇA'], accent: 'Tudo está conectado.', intro: 'O que protege os sistemas que movem o nosso mundo?', quote: 'Você confiaria seus dados a um sistema que não foi desenvolvido para protegê-los?', label: 'Uma conexão muda tudo.', duration: '2 min', color: '#55F5FF', points: [
    ['Muito além do antivírus', 'Cibersegurança protege sistemas, redes e dados contra acessos indevidos, alterações e interrupções.'],
    ['Três objetivos', 'Confidencialidade: acesso só para quem tem permissão. Integridade: dados permanecem corretos. Disponibilidade: o serviço funciona quando necessário.'],
    ['O risco faz parte do código', 'Apps de banco, escola e mensagens dependem de escolhas de desenvolvimento. Uma falha pode afetar pessoas de verdade.'],
  ], notes: '0:00–0:25: pergunte quem usou um aplicativo hoje. 0:25–0:55: explique os três objetivos com o portal escolar: notas privadas, corretas e disponíveis. 0:55–1:35: apresente malware, phishing e ransomware. 1:35–2:00: conecte as ameaças às falhas de desenvolvimento e faça a pergunta da abertura.' },
  { id: 'invasao', short: 'O sistema sob ataque', eyebrow: '02 / A RUPTURA', title: ['BASTA UMA', 'BRECHA.'], accent: 'Uma falha. Muitas consequências.', intro: 'Entre uma requisição e um dado exposto, existe uma decisão de código.', quote: 'Uma vulnerabilidade é uma fraqueza. Uma invasão é o acesso ou a ação sem autorização.', label: 'Siga o caminho da ameaça.', duration: '2 min', color: '#FF425C', points: [
    ['SQL Injection', 'Quando entrada e comando SQL se misturam, um dado pode alterar a consulta. Parâmetros separam as duas coisas.'],
    ['Cross-Site Scripting · XSS', 'Conteúdo não confiável interpretado como código pode executar scripts no navegador. Codificação de saída e APIs seguras ajudam a prevenir.'],
    ['Vazamento não é só invasão', 'Dados também podem ser expostos por permissões erradas ou um arquivo público. Fraudes, perda de confiança e interrupções atingem usuários e organizações.'],
  ], notes: '0:00–0:30: diferencie falha, invasão e vazamento. 0:30–1:10: avance a simulação, narrando usuário, aplicação, API, servidor e banco. 1:10–1:40: diferencie SQL Injection (consulta no servidor) de XSS (script no navegador). 1:40–2:00: discuta consequências e ative a proteção. Nenhum ataque é executado.' },
  { id: 'identidade', short: 'A primeira defesa', eyebrow: '03 / A IDENTIDADE', title: ['PROVE QUE', 'É VOCÊ.'], accent: 'Uma senha é só o começo.', intro: 'Identificar, autenticar e autorizar são três decisões diferentes.', quote: 'O melhor segredo é longo, único e difícil de prever. E não deve trabalhar sozinho.', label: 'Quem entra. O que pode fazer.', duration: '2 min', color: '#55F5FF', points: [
    ['Identificação → autenticação → autorização', '“Sou a Ana” → “Posso provar” → “Posso ver minhas notas”. Entrar no sistema não dá acesso a tudo.'],
    ['Longa, única e bem guardada', 'Use gerenciador de senhas para criar e guardar segredos diferentes. Frases longas ajudam; padrões, nomes e reutilização enfraquecem.'],
    ['Defesa em camadas', 'MFA combina fatores diferentes: algo que você sabe, tem ou é. Limitar tentativas e monitorar abusos reduz ataques automatizados. Duas senhas não são dois fatores.'],
    ['No banco: hash apropriado', 'Guarde um hash com salt único usando algoritmo de senhas, como Argon2id. Hash não é criptografia reversível; SHA-256 sozinho não é adequado para guardar senhas.'],
  ], notes: '0:00–0:30: use o exemplo do aluno que vê só as próprias notas. 0:30–1:15: compare “senha123” com uma frase fictícia longa. O indicador é heurístico e não garante segurança. 1:15–1:40: ative MFA e explique senha + chave de segurança. 1:40–2:00: explique hash, salt e limite de tentativas. Não digite senhas reais.' },
  { id: 'criptografia', short: 'A matemática da proteção', eyebrow: '04 / O SEGREDO', title: ['LEGÍVEL PARA', 'QUEM TEM A CHAVE.'], accent: 'A matemática protege a mensagem.', intro: 'O conteúdo muda de forma. A informação continua lá.', quote: 'Criptografar permite recuperar com uma chave. Fazer hash não tem um processo de descriptografia.', label: 'Transformar. Transportar. Recuperar.', duration: '2 min', color: '#A78BFF', points: [
    ['Simétrica', 'Uma chave secreta cifra e decifra. AES-GCM protege o conteúdo e detecta alterações. O desafio é guardar e compartilhar a chave com segurança.'],
    ['Assimétrica', 'Um par de chaves pública e privada permite operações complementares. É usado, por exemplo, para estabelecer segredos e assinar digitalmente.'],
    ['Em trânsito e em repouso', 'HTTPS usa TLS para proteger a conexão e autenticar o servidor por certificados. Dados guardados também precisam de proteção e boa gestão de chaves. HTTPS não elimina falhas na aplicação.'],
  ], notes: '0:00–0:30: apresente mensagem e chave. 0:30–1:15: cifre, mostre que o resultado parece diferente a cada execução e recupere a mensagem. A chave e o IV são gerados no navegador. 1:15–1:40: compare simétrica e assimétrica. 1:40–2:00: explique TLS, dados guardados e a diferença para hashing. O laboratório é real, mas não é um produto para guardar segredos.' },
  { id: 'codigo', short: 'Segurança por design', eyebrow: '05 / A CONSTRUÇÃO', title: ['SEGURO DESDE', 'A PRIMEIRA LINHA.'], accent: 'Segurança também se programa.', intro: 'Corrigir depois custa tempo. Pensar antes muda a arquitetura.', quote: 'Security by Design: considerar riscos, acessos e proteção dos dados desde o planejamento.', label: 'A diferença está na implementação.', duration: '2 min', color: '#55F5FF', points: [
    ['Entrada não é instrução', 'Valide tipo, tamanho e formato no servidor. Use consultas parametrizadas; validação não substitui parâmetros. Para XSS, trate a saída conforme o contexto.'],
    ['Permissão mínima, em cada requisição', 'Cheque autorização no servidor para cada recurso. Cada conta de serviço deve ter só os privilégios necessários.'],
    ['Segredos ficam fora do código', 'Credenciais não devem ir para o Git nem para o JavaScript público. Use variáveis de ambiente no servidor e faça rotação quando necessário.'],
    ['Segurança continua após o deploy', 'Atualize dependências, revise código e teste cenários de abuso. Mostre erros genéricos ao usuário e mantenha registros internos sem senhas ou outros segredos.'],
  ], notes: '0:00–0:30: explique Security by Design. 0:30–1:10: alterne entre concatenação e parâmetros e mostre a separação código/dado. É pseudocódigo de acesso a PostgreSQL, sem banco conectado. 1:10–1:40: discuta autorização e menor privilégio. 1:40–2:00: conclua com segredos, dependências, testes, revisão e erros seguros.' },
  { id: 'pessoas', short: 'Pessoas, não apenas dados', eyebrow: '06 / O PROPÓSITO', title: ['DO OUTRO LADO,', 'EXISTEM PESSOAS.'], accent: 'Privacidade é uma responsabilidade.', intro: 'Proteger um sistema é proteger quem depende dele.', quote: 'Colete o necessário. Explique a finalidade. Proteja durante todo o ciclo de vida.', label: 'A tecnologia encontra a responsabilidade.', duration: '2–3 min', color: '#A78BFF', points: [
    ['LGPD · Lei nº 13.709/2018', 'Regula o tratamento de dados pessoais. Finalidade, necessidade, transparência e segurança orientam decisões. Consentimento é uma das bases legais, não a única.'],
    ['Direitos dos titulares', 'Incluem confirmação do tratamento, acesso e correção. Eliminação e outros pedidos dependem das hipóteses e exceções da lei. É preciso oferecer um canal para atendê-los.'],
    ['Privacidade na prática', 'Mapeie o que coleta, justifique a finalidade, limite acesso e retenção, descarte com cuidado e prepare resposta a incidentes. A LGPD não impõe uma tecnologia única.'],
    ['Prevenir é um trabalho contínuo', 'Segurança reduz riscos e sustenta confiança, mas exige tempo, orçamento e capacitação. Não existe risco zero. Automação, IA e novos padrões criptográficos exigem estudo constante e profissionais responsáveis.'],
  ], notes: '0:00–0:40: explique dado pessoal com exemplos fictícios: nome e matrícula. 0:40–1:20: relacione finalidade, necessidade, transparência e segurança ao cadastro escolar. 1:20–2:00: explique direitos, bases legais e responsabilidades. 2:00–2:30: discuta benefícios, custos e limites. 2:30–3:00: encerre com as duas frases e convide a turma para perguntas.' },
];
export const threats = [
  ['Malware', 'Software criado para causar dano ou realizar ações indevidas.'],
  ['Phishing', 'Engano que induz a revelar dados ou executar uma ação perigosa.'],
  ['Ransomware', 'Malware que bloqueia acesso a dados ou sistemas e exige resgate; pode também haver roubo de dados.'],
  ['Vulnerabilidades', 'Falhas de implementação ou configuração que podem ser exploradas.'],
];
export const references = [
  ['OWASP', 'SQL Injection Prevention', 'https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html'],
  ['OWASP', 'Cross Site Scripting Prevention', 'https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html'],
  ['OWASP', 'Password Storage', 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html'],
  ['NIST', 'Digital Identity Guidelines · SP 800-63B-4', 'https://pages.nist.gov/800-63-4/sp800-63b.html'],
  ['CISA', 'Secure Our World', 'https://www.cisa.gov/secure-our-world'],
  ['MDN', 'Web Crypto API · AES-GCM', 'https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt'],
  ['ANPD', 'Direitos dos titulares', 'https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados/direito-dos-titulares'],
  ['BRASIL', 'Lei nº 13.709/2018 · LGPD', 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm'],
];
