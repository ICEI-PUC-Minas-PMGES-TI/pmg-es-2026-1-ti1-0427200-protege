// ============================================================
// utils.js — Funções compartilhadas do Refúgio +
// ============================================================

// Chave usada no localStorage para armazenar os contatos
const CHAVE_CONTATOS = "refugio_contatos";

// ---------- Persistência ----------

function obterContatos() {
  const dados = localStorage.getItem(CHAVE_CONTATOS);
  return dados ? JSON.parse(dados) : [];
}

function salvarContatos(contatos) {
  localStorage.setItem(CHAVE_CONTATOS, JSON.stringify(contatos));
}

// ---------- Formatação ----------

function formatarTelefone(valor) {
  const numeros = valor.replace(/\D/g, "").slice(0, 11);

  if (numeros.length <= 2) return `(${numeros}`;
  if (numeros.length <= 6) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  if (numeros.length <= 10)
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
}

function gerarId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ---------- Notificação toast ----------

function exibirToast(mensagem, tipo = "sucesso") {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = mensagem;
  toast.className = `toast toast-${tipo} visivel`;

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.className = "toast";
  }, 3200);
}
