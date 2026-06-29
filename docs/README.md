# Introdução

Informações básicas do projeto.

* **Projeto:** Protege Plus
* **Repositório GitHub:** https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2026-1-ti1-0427200-protege
* **Membros da equipe:**

  * [Anna Luiza Pereira Silva](https://github.com/annaluizapsilva-03)
  * [Beatriz Almeida Andrade](https://github.com/biaalmeidaandradee7-crypto)
  * [Giovana Faria Martins](https://github.com/giovanafariaa)
  * [Lukas Nathan Matos Candeia](https://github.com/cicrano)
  * [Maria Luiza Queiroz Martins da Silva](https://github.com/mariaqueirozz)
  * [Matheus Campos Pereira](https://github.com/Matheuscamp)

A documentação do projeto é estruturada da seguinte forma:

1. Introdução
2. Contexto
3. Product Discovery
4. Product Design
5. Metodologia
6. Solução
7. Referências Bibliográficas

✅ [Documentação de Design Thinking (MIRO)](files/Protege+_processo.pdf)

# Contexto

Detalhes sobre o espaço de problema, os objetivos do projeto, sua justificativa e público-alvo.

## Problema

A violência doméstica é um problema social grave e persistente no Brasil. Muitas vítimas — mulheres, crianças, idosas e pessoas LGBTQIA+ — enfrentam barreiras significativas para buscar ajuda: o medo de represálias, a dependência emocional e financeira do agressor, a falta de informação sobre os canais de denúncia disponíveis e o risco de ser descoberta ao tentar pedir socorro.

Em muitos casos, a vítima não pode simplesmente ligar para uma delegacia ou sair de casa para registrar uma ocorrência, pois está sob vigilância constante ou em situação de vulnerabilidade extrema. O processo de denúncia tradicional, burocrático e presencial, acaba sendo inacessível justamente para quem mais precisa dele.

Além disso, existe uma lacuna importante no que diz respeito à orientação: muitas pessoas próximas às vítimas — familiares, amigos, vizinhos — também não sabem como agir ou a quem recorrer quando identificam sinais de violência doméstica.

## Objetivos

O objetivo geral deste trabalho é desenvolver uma plataforma web segura, sigilosa e acessível para auxiliar vítimas de violência doméstica e seus familiares a buscar ajuda, realizar denúncias e acessar redes de apoio, sem precisar sair de casa ou se expor a riscos maiores.

São objetivos específicos do projeto:


  - Oferecer um canal de denúncia rápida (botão SOS) que permita registrar ocorrências de forma simples e anônima, com envio de localização e contato de confiança.
  - Disponibilizar uma lista com redes de apoio próximas à vítima, como delegacias, hospitais e ONGs especializadas.
  - Criar um espaço seguro para armazenamento de provas (fotos, áudios e documentos), protegido por senha, que possa ser utilizado em processos judiciais.
  - Oferecer um chat anônimo com triagem por bot e encaminhamento para profissionais de apoio psicológico e jurídico.

## Justificativa

Segundo o Anuário Brasileiro de Segurança Pública, o Brasil registra altos índices de feminicídio e violência doméstica a cada ano. Estima-se que apenas uma fração das ocorrências seja efetivamente registrada, dado o medo, o estigma social e a falta de acesso a canais seguros de denúncia.

A motivação para o desenvolvimento desta plataforma surgiu da escuta ativa de perfis reais de pessoas que vivem — ou convivem — com situações de violência: uma idosa de 65 anos que não sabe como denunciar sem se expor, uma criança que sofre violência em casa e não tem a quem recorrer, uma mulher trans que teme não ser levada a sério, uma jovem que quer ajudar a sobrinha e não sabe por onde começar.

A plataforma Protege+ visa preencher essas lacunas com tecnologia humanizada, acessível e discreta, colocando a segurança e o bem-estar da vítima em primeiro lugar.

## Público-Alvo

A plataforma é voltada para pessoas que vivenciam ou testemunham situações de violência doméstica. O público-alvo inclui:


  - Mulheres em situação de violência — de diferentes faixas etárias, com variados níveis de familiaridade com tecnologia, que precisam de um canal seguro, sigiloso e de fácil acesso para pedir socorro ou registrar uma denúncia.
  - Idosas — com pouca experiência em tecnologia, que precisam de uma interface simples, com linguagem clara e suporte por voz ou poucas etapas.
  - Crianças e adolescentes — que vivem situações de violência doméstica e precisam de orientação e de um caminho seguro para pedir ajuda.
  - Pessoas LGBTQIA+ — que enfrentam violência relacionada à sua identidade de gênero ou orientação sexual e precisam de um ambiente acolhedor e sem julgamentos.
  - Familiares e amigos das vítimas — que identificam sinais de violência e não sabem como agir ou onde buscar orientação.


Esse público possui perfis variados em termos de idade, escolaridade e relação com a tecnologia, o que reforça a necessidade de uma interface acessível, intuitiva e com suporte para diferentes formas de interação (texto, voz, poucos cliques).

# Product Discovery

## Etapa de Entendimento

Durante a etapa de entendimento, a equipe utilizou a metodologia de Design Thinking para compreender em profundidade o problema da violência doméstica e as necessidades das pessoas afetadas por ele. Foram elaborados os seguintes artefatos:


  - Matriz CSD (Certezas, Suposições e Dúvidas): utilizada para organizar o conhecimento inicial da equipe, separando o que já era sabido, o que era apenas suposição e o que ainda precisava ser investigado.
  - Mapa de Stakeholders: mapeamento dos principais grupos envolvidos — vítimas diretas, familiares, profissionais de saúde e assistência social, ONGs, delegacias e o sistema de justiça.
  - Entrevistas qualitativas: realizadas com pessoas próximas ao contexto de violência doméstica, com o objetivo de validar suposições e identificar dores reais.
  - Highlights de pesquisa: compilado dos principais aprendizados obtidos nas entrevistas, que orientaram a definição das personas e das funcionalidades prioritárias.

## Etapa de Definição

### Personas

<img src="./images/G3 - Violência Doméstica - Personas_01.jpg">
<img src="./images/G3 - Violência Doméstica - Personas_02.jpg">
<img src="./images/G3 - Violência Doméstica - Personas_03.jpg">
<img src="./images/G3 - Violência Doméstica - Personas_04.jpg">
<img src="./images/G3 - Violência Doméstica - Personas_05.jpg">
<img src="./images/G3 - Violência Doméstica - Personas_06.jpg">

# Product Design

Nesse momento, vamos transformar os insights e validações obtidos em soluções tangíveis e utilizáveis. Essa fase envolve a definição de uma proposta de valor, detalhando a prioridade de cada ideia e a consequente criação de wireframes, mockups e protótipos de alta fidelidade, que detalham a interface e a experiência do usuário.

## Histórias de Usuários

Com base na análise das personas foram identificadas as seguintes histórias de usuários:

| EU COMO... `PERSONA` | QUERO/PRECISO... `FUNCIONALIDADE` | PARA... `MOTIVO/VALOR` |
|---|---|---|
| Geralda (idosa, pouca familiaridade com tecnologia) | Realizar uma denúncia com poucos cliques, sem precisar sair de casa | Me sentir segura e protegida sem me expor ao agressor |
| Letícia (familiar da vítima) | Fazer uma denúncia em nome da minha sobrinha de forma segura e eficaz | Protegê-la da violência que sofre por parte do pai |
| Pedro (criança em situação de violência) | Acessar um canal de denúncia fácil e sigiloso | Sair da situação de violência e receber orientação |
| Fernanda (mulher trans) | Denunciar de forma anônima e expor o agressor | Me proteger e alertar outras pessoas sobre o perigo |
| Marilene (idosa) | Me informar sobre os perigos da minha cidade e sentir segurança ao sair sozinha | Manter minha independência sem correr riscos |
| Cláudia (vítima de dependência emocional) | Receber apoio psicológico e orientação jurídica pelo chat | Ter coragem de me libertar da situação e buscar ajuda profissional |

## Proposta de Valor

A plataforma Protege+ entrega valor às suas personas ao eliminar as principais barreiras que impedem vítimas e familiares de buscar ajuda:

**Para vítimas com baixo letramento digital (Geralda, Marilene):** interface simples, linguagem clara, possibilidade de uso por voz e denúncia com poucos cliques — reduzindo a dificuldade com tecnologia e o medo de se expor.

**Para crianças (Pedro):** canal acessível, sigiloso e acolhedor, com atendimento humanizado que transmite segurança e orientação.

**Para pessoas LGBTQIA+ (Fernanda):** anonimato garantido, denúncia eficiente e acolhimento com respeito e empatia.

**Para familiares e pessoas próximas (Letícia):** facilidade para fazer denúncias em nome de terceiros e acesso a orientações sobre como agir.

**Para vítimas em dependência emocional (Cláudia):** suporte psicológico via chat, acesso a grupos de apoio e recursos jurídicos para planejar a saída da situação.

## Requisitos

### Requisitos Funcionais

| ID | Descrição do Requisito | Prioridade |
|---|---|---|
| RF-001 | Botão de denúncia rápida (SOS) — formulário curto com descrição do ocorrido, envio de localização e contato de confiança para quem quer que enviar | ALTA |
| RF-002 | Visualização de mapa com redes de apoio próximas (Delegacias, Hospitais e ONGs) com geolocalização | ALTA |
| RF-003 | Chat anônimo com bot de triagem e encaminhamento para chat com profissional | ALTA |
| RF-004 | CRUD para armazenamento de provas (fotos, áudios, documentos) com senha de acesso protegido | ALTA |
| RF-005 | Cadastro de contatos de confiança | ALTA |
| RF-006 | Seção "Como podemos te ajudar?" / FAQ com orientações sobre violência doméstica | MÉDIA |
| RF-007 | Registro e visualização de contatos cadastrados pelo usuário | MÉDIA |
| RF-008 | Painel de Estatísticas sobre violência doméstica | MÉDIA |
| RF-009 | Biblioteca de conteúdos educativos sobre violência doméstica e direitos das vítimas | MÉDIA |
| RF-010 | Identificação de sinais de violência doméstica | MÉDIA |
| RF-011 | Gerenciamento de denúncias por categorias (ameaças, assédio, violência doméstica) | MÉDIA |
| RF-012 | Registro e histórico de denúncias realizadas | MÉDIA |

### Requisitos Não Funcionais

| ID | Descrição do Requisito | Prioridade |
|---|---|---|
| RNF-001 | O sistema deve garantir o sigilo e o anonimato do usuário em todas as interações de denúncia | ALTA |
| RNF-002 | A plataforma deve ser responsiva, funcionando corretamente em dispositivos móveis e desktop | ALTA |
| RNF-003 | A interface deve ser acessível para pessoas com baixo letramento digital, com linguagem simples e clara | ALTA |
| RNF-004 | O sistema deve processar requisições do usuário em no máximo 3 segundos | MÉDIA |
| RNF-005 | O armazenamento de provas deve ser protegido por criptografia e senha de acesso individual | ALTA |
| RNF-006 | O sistema deve estar disponível 24 horas por dia, 7 dias por semana | ALTA |
| RNF-007 | A plataforma deve ser compatível com os principais navegadores modernos (Chrome, Firefox, Edge, Safari) | MÉDIA |

## Projeto de Interface

Artefatos relacionados com a interface e a interacão do usuário na proposta de solução.

### Wireframes

Estes são os protótipos de telas do sistema.

<img src="./images/wireframe.png">

### User Flow

**✳️✳️✳️ COLOQUE AQUI O DIAGRAMA DE FLUXO DE TELAS ✳️✳️✳️**

<img src="./images/fluxo_de_paginas.png">

### Protótipo Interativo

✅ [Protótipo Interativo (Figma)](https://www.figma.com/proto/lXR7KDcyXh9lFUwJEylr2W/G3---Viol%C3%AAncia-Dom%C3%A9stica?node-id=42-32&p=f&t=KmVnU2dfF8QStxC4-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=42%3A32)

# Metodologia

Detalhes sobre a organização do grupo e o ferramental empregado.

## Ferramentas

Relação de ferramentas empregadas pelo grupo durante o projeto.

Processo de Design Thinking | Miro | https://miro.com/app/board/uXjVGvSbycg=/
Repositório de código | GitHub | https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2026-1-ti1-0427200-protege
Protótipo Interativo | Figma | https://www.figma.com/design/lXR7KDcyXh9lFUwJEylr2W/G3---Viol%C3%AAncia-Dom%C3%A9stica?t=82K9kQzsXFl8SmUS-0
Comunicação da equipe | WhatsApp
Editor de código | VS Code | https://code.visualstudio.com/

# Solução Implementada

Esta seção apresenta todos os detalhes da solução criada no projeto.

## Vídeo do Projeto

O vídeo a seguir traz uma apresentação do problema que a equipe está tratando e a proposta de solução. ⚠️ EXEMPLO ⚠️

[Vídeo do projeto](https://drive.google.com/file/d/1xTUYgOhwPOpp53TdFl3HJR2Nq_fBIc5M/view?usp=drive_link)

## Funcionalidades

### Funcionalidade 1 — Botão de Denúncia Rápida (SOS)

Permite que qualquer usuário registre uma denúncia de forma rápida e sigilosa, informando uma descrição breve do ocorrido, enviando sua localização e indicando um contato de confiança para ser acionado.

* **Estrutura de dados:** Denúncias
* **Responsável:** Anna Luiza
* **Instruções de acesso:**
  * Acesse a plataforma pelo navegador
  * Na tela inicial, clique no botão "SOS / Denúncia Rápida"
  * Preencha o formulário curto e confirme o envio

<img src="./images/denuncia_rapida.png">

---

### Funcionalidade 2 — Mapa com Redes de Apoio

Exibe uma lista com delegacias, hospitais e ONGs próximas à localização do usuário, utilizando geolocalização.

* **Estrutura de dados:** Pontos de apoio (endereço, tipo, contato)
* **Responsável:** Matheus Campos
* **Instruções de acesso:**
  * Clique em "Locais de ajuda" no menu
  * Visualize os pontos de suporte próximos e clique para obter detalhes

<img src="./images/denuncia_rapida.png">

---

### Funcionalidade 3 — Chat Anônimo

Oferece um canal de comunicação anônima com bot de triagem inicial e encaminhamento para profissionais de apoio psicológico ou jurídico.

* **Estrutura de dados:** Sessões de chat
* **Responsável:** Beatriz Almeida
* **Instruções de acesso:**
  * Acesse a plataforma e clique em "Chat de apoio "
  * Inicie a triagem com o bot
  * Receba um relatório completo sobre sua situação

<img src="./images/chat_de_apoio.png">

---

### Funcionalidade 4 — Cofre de Provas

Permite o armazenamento seguro de fotos, áudios e documentos como evidências.

* **Estrutura de dados:** Provas (arquivo, tipo, data, descrição)
* **Responsável:** Giovana Faria
* **Instruções de acesso:**
  * Acesse a plataforma e entre na seção "Armazenar provas"
  * Faça o upload de fotos, áudios ou documentos

<img src="./images/armazem_de_provas.png">

---

### Funcionalidade 5 — Contatos de Confiança

Permite cadastrar contatos de pessoas de confiança que podem ser acionadas em situações de emergência.

* **Estrutura de dados:** Contatos (nome, telefone, relação com o usuário)
* **Responsável:** Lukas Nathan
* **Instruções de acesso:**
  * Acesse a plataforma e entre em "Cadastros de confiança"
  * Clique em "Adicionar contato" e preencha os dados
  * O contato ficará disponível para ser acionado via botão SOS

<img src="./images/cadastros_de_confianca.png">

---

### Funcionalidade 6 — FAQ / Como Podemos te Ajudar?

Seção informativa com orientações sobre violência doméstica, identificação de sinais e encaminhamentos.

* **Responsável:** Maria Luiza Queiroz
* **Instruções de acesso:**
  * Acesse o menu e clique em "Forum"
  * Navegue pelas categorias de perguntas frequentes

<img src="./images/forum.png">

---
### Funcionalidade 7 — Minas denúncias

Acessar as denúncias feitas pela vítima

* **Estrutura de dados:** Denúncias
* **Responsável:** Anna Luiza
* **Instruções de acesso:**
  * Acesse a plataforma pelo navegador
  * Na tela inicial, clique no botão "SOS / Denúncia Rápida"
  * Acesse a parte, "Minhas Denúncias"

<img src="./images/minhas_denuncias.png">

---

### Funcionalidade 8 — Ver minhas provas

Exibe uma lista com todas as provas armazenadas pela vítima

* **Estrutura de dados:** Provas (arquivo, tipo, data, descrição)
* **Responsável:** Giovana Faria
* **Instruções de acesso:**
  * Clique em "Armazenar Provas" no menu
  * Depois clique em "Ver minhas provas"

<img src="./images/ver_minhas_provas.png">

---

### Funcionalidade 9 — Biblioteca de Conteúdo

Oferece um canal de comunicação anônima com bot de triagem inicial e encaminhamento para profissionais de apoio psicológico ou jurídico.

* **Estrutura de dados:** Saiba mais
* **Responsável:** Beatriz Almeida
* **Instruções de acesso:**
  * Acesse a plataforma e clique em "Saiba mais"
  * Exibira informações úteis sobre Violência Domestica
  * Receba um relatório completo sobre sua situação

<img src="./images/biblioteca_de_conteudo.png">

---

### Funcionalidade 10 — Contatos Cadastrados

Exibe os usuários cadastrados.

* **Estrutura de dados:** Contatos de confiança
* **Responsável:** Lukas Natan
* **Instruções de acesso:**
  * Acesse a plataforma e entre na seção "Cadastros de confiança"
  * Depos acesse "Ver Cadastros"

<img src="./images/contatos_cadastrados.png">

---

### Funcionalidade 11 — Pesquisas e dúvidas

Exibe pesquisas e dúvidas frequentes pelos usuários

* **Estrutura de dados:** Contatos (nome, telefone, relação com o usuário)
* **Responsável:** Maria Luiza Queiroz
* **Instruções de acesso:**
  * Acesse a plataforma e entre em "Forum"
  * Clique em "Ver pesquisas e duvidas"
  * E exibira as dúvidas frequentes

<img src="./images/pesquisas_e_duvidas.png">

---

### Funcionalidade 12 — Painel de estatísticas

Seção informativa para mostrar as denuncias realizadas, como forma de incentivo

* **Responsável:** Matheus Campos Pereira
* **Instruções de acesso:**
  * Acesse o menu e clique em "Saiba mais"
  * Clique em "Estatísticas"
  * Exibirá as informações
  

<img src="./images/painel_de_estatisticas.png">

---

## Estruturas de Dados

Descrição das estruturas de dados utilizadas na solução com exemplos no formato JSON.Info

##### Estrutura de Dados - Contatos

Contatos da aplicação

```json
  {
  "contatos": [
    {
      "nome": "Lukas Nathan Matos Candeia",
      "email": "lukas@gmail.com",
      "telefone": "(31) 9999-9999",
      "nivel": "Familiar",
      "cadastradoEm": "26/06/2026",
      "id": "Qo6NfrI3tKE"
    },
    {
      "nome": "Beatriz Almeida Andrade",
      "email": "beatriz@gmail.com",
      "telefone": "(31) 98888-8889",
      "nivel": "Conhecidos",
      "cadastradoEm": "26/06/2026",
      "id": "Afoa3RbGqKM"
    },
    {
      "nome": "Giovanna Faria Martins",
      "email": "gioavanna@gmail.com",
      "telefone": "(31) 97777-7777",
      "nivel": "Amigos",
      "cadastradoEm": "26/06/2026",
      "id": "sWqXtbtDQWA"
    },
    {
      "nome": "Maria Luiza Queiroz Martins da Silva",
      "email": "maria@gmail.com",
      "telefone": "(31) 96666-6666",
      "nivel": "Familiar",
      "cadastradoEm": "26/06/2026",
      "id": "85eDVQIK_48"
    },
    {
      "nome": "Matheus Campos de Almeida Melo",
      "email": "matheus@gmail.com",
      "telefone": "(31) 95555-5555",
      "nivel": "Amigos",
      "cadastradoEm": "26/06/2026",
      "id": "cybkjuyIyEk"
    },
    {
      "nome": "Anna Luiza Pinto Pereira",
      "email": "anna@gmail.com",
      "telefone": "(31) 94444-4444",
      "nivel": "Amigos",
      "cadastradoEm": "26/06/2026",
      "id": "sC1tHzlegFg"
    },
    {
      "nome": "Giovana Faria Martins",
      "email": "giovana@gmail.com",
      "telefone": "(31) 99999-9999",
      "nivel": "Conhecidos",
      "cadastradoEm": "26/06/2026",
      "id": "DQyOEHZ"
    }
  ],
  "$schema": "./node_modules/json-server/schema.json"
}
```

##### Estrutura de Dados - Usuários

Registro dos usuários do sistema utilizados para login e para o perfil do sistema

```json
  {
    id: "eed55b91-45be-4f2c-81bc-7686135503f9",
    email: "admin@abc.com",
    id: "eed55b91-45be-4f2c-81bc-7686135503f9",
    login: "admin",
    nome: "Administrador do Sistema",
    senha: "123"
  }
```

## Módulos e APIs

Esta seção apresenta os módulos e APIs utilizados na solução

**Scripts:**

* Bootstrap - [http://getbootstrap.com/](http://getbootstrap.com/)

# Referências

* BRASIL. Lei nº 11.340, de 7 de agosto de 2006 (Lei Maria da Penha). Brasília: Presidência da República, 2006. Disponível em: https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm

* FÓRUM BRASILEIRO DE SEGURANÇA PÚBLICA. Anuário Brasileiro de Segurança Pública 2023. São Paulo: FBSP, 2023. Disponível em: https://forumseguranca.org.br/anuario-brasileiro-seguranca-publica/

* INSTITUTO MARIA DA PENHA. O que é violência doméstica?. Disponível em: https://www.institutomariadapenha.org.br/violencia-domestica/o-que-e-violencia-domestica.html

* CENTRAL DE ATENDIMENTO À MULHER — Ligue 180. Disponível em: https://www.gov.br/mdh/pt-br/navegue-por-temas/politicas-para-mulheres/ligue-180