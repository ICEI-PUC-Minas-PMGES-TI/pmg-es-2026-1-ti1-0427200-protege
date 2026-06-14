const CHAVE_BD = "amparo_contatos";

// ---------- Armazenamento ----------
const Armazenamento = {
  buscarTodos() {
    try {
      return JSON.parse(localStorage.getItem(CHAVE_BD) || "[]");
    } catch {
      return [];
    }
  },

  salvar(lista) {
    localStorage.setItem(CHAVE_BD, JSON.stringify(lista));
  },

  adicionar(contato) {
    const lista = this.buscarTodos();
    contato.id = Date.now().toString();
    contato.cadastradoEm = new Date().toLocaleDateString("pt-BR");
    lista.push(contato);
    this.salvar(lista);
    return contato;
  },

  remover(id) {
    const lista = this.buscarTodos().filter((c) => c.id !== id);
    this.salvar(lista);
  },

  buscarPorId(id) {
    return this.buscarTodos().find((c) => c.id === id) || null;
  },
};

// ---------- Notificação (Toast) ----------
function exibirToast(mensagem, tipo = "sucesso") {
  const elemento = document.getElementById("toast");
  if (!elemento) return;
  elemento.textContent = mensagem;
  elemento.className = `visivel ${tipo}`;
  clearTimeout(elemento._temporizador);
  elemento._temporizador = setTimeout(() => {
    elemento.className = "";
  }, 3000);
}

// ---------- Iniciais do avatar ----------
function gerarIniciais(nome) {
  return nome
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((palavra) => palavra[0].toUpperCase())
    .join("");
}

// ---------- Classe de cor do avatar por nível ----------
function classeAvatar(nivel) {
  if (nivel === "Familiar") return "avatar-familiar";
  if (nivel === "Amigos") return "avatar-amigos";
  if (nivel === "Conhecidos") return "avatar-conhecidos";
  return "avatar-familiar";
}

// ---------- Classe do badge por nível ----------
function classeBadge(nivel) {
  if (nivel === "Familiar") return "badge-familiar";
  if (nivel === "Amigos") return "badge-amigos";
  if (nivel === "Conhecidos") return "badge-conhecidos";
  return "badge-familiar";
}

// ---------- SVGs reutilizáveis ----------
const Icones = {
  lixeira: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`,
  semResultado: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>`,
};
