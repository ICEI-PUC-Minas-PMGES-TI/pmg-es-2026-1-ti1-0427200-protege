# Amparo — Contatos de Confiança

Sistema de cadastro e visualização de contatos de confiança para apoio em situações de violência doméstica.

## Estrutura do projeto

```
amparo/
├── cadastro.html       ← Tela de cadastro de contatos
├── listagem.html       ← Tela de visualização e busca
├── css/
│   └── style.css       ← Todos os estilos
├── js/
│   ├── utils.js        ← Funções compartilhadas (Storage, helpers)
│   ├── cadastro.js     ← Lógica da tela de cadastro
│   └── listagem.js     ← Lógica da tela de listagem
└── data/
    └── contatos.json   ← Exemplo de estrutura de dados
```
> Os dados são salvos automaticamente no **localStorage** do navegador.
> Não é necessário servidor ou internet para funcionar.

## Funcionalidades

### Tela de Cadastro (`cadastro.html`)
- Campos: Nome completo, E-mail, Telefone (com máscara automática)
- Seleção de nível: Familiar / Amigos / Conhecidos
- Validação de todos os campos antes de salvar
- Mensagens de erro claras
- Toast de confirmação ao salvar

### Tela de Listagem (`listagem.html`)
- Busca em tempo real por nome ou e-mail
- Filtros por nível de parentesco
- Cards com avatar, informações e badges coloridos
- Botão de excluir com modal de confirmação
- Estado vazio com link para cadastro

## Tecnologias utilizadas
- HTML5 semântico
- CSS3 com variáveis (sem frameworks externos)
- JavaScript puro (Vanilla JS)
- localStorage para persistência dos dados
- Google Fonts (DM Sans + DM Serif Display)
