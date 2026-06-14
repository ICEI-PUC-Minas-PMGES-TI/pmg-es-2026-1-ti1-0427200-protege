document.addEventListener("DOMContentLoaded", () => {
  // ----- Elementos da página -----
  const listaContatos = document.getElementById("listaContatos");
  const rodapeTotal = document.getElementById("totalContatos");
  const campoBusca = document.getElementById("campoBusca");
  const botoesFiltro = document.querySelectorAll(".botao-filtro");
  const modal = document.getElementById("modalConfirmacao");
  const mensagemModal = document.getElementById("mensagemModal");
  const botaoConfirmar = document.getElementById("botaoConfirmarExclusao");
  const botaoCancelar = document.getElementById("botaoCancelarExclusao");

  let filtroAtivo = "todos";
  let idParaExcluir = null;

  // ----- Renderiza a lista de contatos -----
  function renderizarLista() {
    const termoBusca = campoBusca.value.trim().toLowerCase();
    const todosContatos = Armazenamento.buscarTodos();

    // Aplica filtro de nível e busca por texto
    const contatosFiltrados = todosContatos.filter((contato) => {
      const correspondeNivel =
        filtroAtivo === "todos" || contato.nivel === filtroAtivo;
      const correspondeBusca =
        !termoBusca ||
        contato.nome.toLowerCase().includes(termoBusca) ||
        contato.email.toLowerCase().includes(termoBusca);
      return correspondeNivel && correspondeBusca;
    });

    // Exibe estado vazio se não houver resultados
    if (contatosFiltrados.length === 0) {
      listaContatos.innerHTML = `
        <div class="estado-vazio">
          ${Icones.semResultado}
          <p>${
            todosContatos.length === 0
              ? 'Nenhum contato cadastrado ainda. <a href="cadastro.html">Cadastre o primeiro!</a>'
              : "Nenhum contato encontrado para esta busca."
          }</p>
        </div>`;
      rodapeTotal.textContent = "";
      return;
    }

    // Monta os cards de cada contato
    listaContatos.innerHTML = contatosFiltrados
      .map(
        (contato) => `
      <div class="cartao-contato" data-id="${contato.id}">
        <div class="avatar ${classeAvatar(contato.nivel)}">${gerarIniciais(contato.nome)}</div>
        <div class="info-contato">
          <div class="nome-contato">${escaparHtml(contato.nome)}</div>
          <div class="email-contato">${escaparHtml(contato.email)}</div>
          <span class="badge ${classeBadge(contato.nivel)}">${escaparHtml(contato.nivel)}</span>
        </div>
        <div class="telefone-contato">${escaparHtml(contato.telefone)}</div>
        <div class="acoes-cartao">
          <button class="botao-icone excluir"
            data-id="${contato.id}"
            title="Excluir contato"
            aria-label="Excluir ${escaparHtml(contato.nome)}">
            ${Icones.lixeira}
          </button>
        </div>
      </div>
    `,
      )
      .join("");

    // Atualiza o contador de resultados
    const total = contatosFiltrados.length;
    rodapeTotal.textContent = `${total} contato${total !== 1 ? "s" : ""} encontrado${total !== 1 ? "s" : ""}`;

    // Associa o evento de excluir a cada botão
    listaContatos.querySelectorAll(".botao-icone.excluir").forEach((botao) => {
      botao.addEventListener("click", () => abrirModal(botao.dataset.id));
    });
  }

  // ----- Escapa caracteres especiais para evitar XSS -----
  function escaparHtml(texto) {
    return String(texto)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // ----- Filtros por nível de parentesco -----
  botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", () => {
      // Remove o estado ativo de todos os filtros
      botoesFiltro.forEach((b) => (b.className = "botao-filtro"));
      filtroAtivo = botao.dataset.filtro;

      const classePorFiltro = {
        todos: "ativo-todos",
        Familiar: "ativo-familiar",
        Amigos: "ativo-amigos",
        Conhecidos: "ativo-conhecidos",
      };

      botao.classList.add(classePorFiltro[filtroAtivo] || "ativo-todos");
      renderizarLista();
    });
  });

  // ----- Busca em tempo real -----
  campoBusca.addEventListener("input", renderizarLista);

  // ----- Abre o modal de confirmação de exclusão -----
  function abrirModal(id) {
    const contato = Armazenamento.buscarPorId(id);
    if (!contato) return;
    idParaExcluir = id;
    mensagemModal.textContent = `Deseja realmente excluir "${contato.nome}"? Esta ação não pode ser desfeita.`;
    modal.classList.add("aberto");
  }

  // ----- Fecha o modal -----
  function fecharModal() {
    modal.classList.remove("aberto");
    idParaExcluir = null;
  }

  // ----- Confirma a exclusão -----
  botaoConfirmar.addEventListener("click", () => {
    if (!idParaExcluir) return;
    Armazenamento.remover(idParaExcluir);
    fecharModal();
    renderizarLista();
    exibirToast("Contato removido.", "erro");
  });

  botaoCancelar.addEventListener("click", fecharModal);

  // Fecha o modal ao clicar fora dele
  modal.addEventListener("click", (evento) => {
    if (evento.target === modal) fecharModal();
  });

  // ----- Inicializa a lista -----
  renderizarLista();
});
