const URL_API = "http://localhost:3000/contatos";

// Armazenamento (JSON Server)
const Armazenamento = {
  async buscarTodos() {
    const resposta = await fetch(URL_API);
    return resposta.json();
  },

  async adicionar(contato) {
    contato.cadastradoEm = new Date().toLocaleDateString("pt-BR");
    const resposta = await fetch(URL_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contato),
    });
    return resposta.json();
  },

  async remover(id) {
    await fetch(`${URL_API}/${id}`, { method: "DELETE" });
  },

  async buscarPorId(id) {
    const resposta = await fetch(`${URL_API}/${id}`);
    if (!resposta.ok) return null;
    return resposta.json();
  },
};

// Notificação (Toast)
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

// ---------- Iniciais do avatar (IA) ----------
function gerarIniciais(nome) {
  return nome
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((palavra) => palavra[0].toUpperCase())
    .join("");
}

// ---------- Classe de cor do avatar por nível (IA) ----------
function classeAvatar(nivel) {
  if (nivel === "Familiar") return "avatar-familiar";
  if (nivel === "Amigos") return "avatar-amigos";
  if (nivel === "Conhecidos") return "avatar-conhecidos";
  return "avatar-familiar";
}

// ---------- Classe do badge por nível (IA) ----------
function classeBadge(nivel) {
  if (nivel === "Familiar") return "badge-familiar";
  if (nivel === "Amigos") return "badge-amigos";
  if (nivel === "Conhecidos") return "badge-conhecidos";
  return "badge-familiar";
}

// ---------- SVGs reutilizáveis (IA) ----------
const Icones = {
  lixeira: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`,
  semResultado: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>`,
};
