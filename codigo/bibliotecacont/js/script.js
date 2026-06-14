
const API_URL = "http://localhost:5501";

// ── Estado da aplicação ──────────────────────
let abaAtiva = "sinais";
let mitoAberto = null;

// ── Inicialização ────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  configurarAbas();
  carregarAba("sinais");
});

// ── Configura os botões de aba ───────────────
function configurarAbas() {
  const botoes = document.querySelectorAll(".btn-aba");
  botoes.forEach((btn) => {
    btn.addEventListener("click", () => {
      const aba = btn.dataset.aba;
      trocarAba(aba);
    });
  });
}

function trocarAba(novaAba) {
  // Atualiza botões
  document.querySelectorAll(".btn-aba").forEach((btn) => {
    btn.classList.toggle("ativa", btn.dataset.aba === novaAba);
  });

  abaAtiva = novaAba;
  carregarAba(novaAba);
}

// ── Carrega conteúdo da aba via fetch ────────
async function carregarAba(aba) {
  const area = document.getElementById("conteudo-aba");
  mostrarLoading(area);

  try {
    switch (aba) {
      case "sinais":
        const sinais = await buscarDados("sinais");
        renderizarSinais(area, sinais);
        break;

      case "tipos":
        const tipos = await buscarDados("tipos");
        renderizarTipos(area, tipos);
        break;

      case "mitos":
        const mitos = await buscarDados("mitos");
        renderizarMitos(area, mitos);
        break;

      case "passos":
        const passos = await buscarDados("passos");
        renderizarPassos(area, passos);
        break;
    }
  } catch (erro) {
    mostrarErro(area);
    console.error("Erro ao buscar dados:", erro);
  }
}

// ── Busca dados do JSON Server ───────────────
async function buscarDados(endpoint) {
  const resposta = await fetch(`${API_URL}/${endpoint}`);
  if (!resposta.ok) throw new Error(`Erro HTTP: ${resposta.status}`);
  return resposta.json();
}

// ── Loading e erro ───────────────────────────
function mostrarLoading(area) {
  area.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      Carregando dados...
    </div>
  `;
}

function mostrarErro(area) {
  area.innerHTML = `
    <div class="erro-conexao">
      ⚠️ Não foi possível conectar ao servidor.<br><br>
      Certifique-se de que o JSON Server está rodando:<br>
      <code>npx json-server --watch data/db.json --port 5501</code>
    </div>
  `;
}

// ============================================
//  RENDERIZADORES DE ABA
// ============================================

// ── ABA: SINAIS ──────────────────────────────
function renderizarSinais(area, sinais) {
  const cardsHtml = sinais
    .map(
      (s) => `
    <div class="sinal-card" 
         style="border: 1.5px solid ${s.corBorda};"
         onclick="abrirModal('${s.id}')">
      <div class="sinal-card-topo" style="background: ${s.cor};">
        ${s.emoji}
      </div>
      <div class="sinal-card-corpo">
        <div class="sinal-card-titulo">${s.titulo}</div>
        <div class="sinal-card-resumo">${s.resumo}</div>
        <span class="btn-saiba-mais">Saiba Mais</span>
      </div>
    </div>
  `
    )
    .join("");

  area.innerHTML = `
    <div class="sinais-container">
      <div class="sinais-grid">
        <div class="label-secao">Sinais de Alerta</div>
        <div class="grid-cards">${cardsHtml}</div>
      </div>
      <div class="ilustracao-lateral">
        ${svgIlustracao()}
      </div>
    </div>
  `;

  // Armazena os dados no dataset para o modal usar
  area.dataset.sinais = JSON.stringify(sinais);
}

// ── ABA: TIPOS ───────────────────────────────
function renderizarTipos(area, tipos) {
  const itensHtml = tipos
    .map(
      (t) => `
    <div class="tipo-card" 
         style="background: ${t.bg}; border: 1.5px solid ${t.cor}30; border-left: 4px solid ${t.cor};">
      <div class="tipo-emoji">${t.emoji}</div>
      <div>
        <div class="tipo-nome" style="color: ${t.cor};">${t.nome}</div>
        <div class="tipo-desc">${t.desc}</div>
      </div>
    </div>
  `
    )
    .join("");

  area.innerHTML = `
    <div class="label-secao">5 tipos de violência — todos são crimes</div>
    <div class="tipos-lista">${itensHtml}</div>
    <div class="tipos-lei">
      ⚖️ A Lei Maria da Penha (Lei 11.340/2006) protege você de todos esses tipos de violência.
    </div>
  `;
}

// ── ABA: MITOS ───────────────────────────────
function renderizarMitos(area, mitos) {
  const itensHtml = mitos
    .map(
      (m, i) => `
    <div class="mito-item" id="mito-${i}" onclick="toggleMito(${i})">
      <div class="mito-pergunta">
        <div class="mito-texto">❌ ${m.mito}</div>
        <div class="mito-seta">▼</div>
      </div>
      <div class="mito-resposta">
        ✅ <strong>Verdade:</strong> ${m.verdade}
      </div>
    </div>
  `
    )
    .join("");

  area.innerHTML = `
    <div class="label-secao">Mitos x Verdades</div>
    <div class="mitos-dica">Toque em cada mito para ver a verdade 👇</div>
    <div class="mitos-lista">${itensHtml}</div>
  `;
}

function toggleMito(index) {
  const item = document.getElementById(`mito-${index}`);
  const estaAberto = item.classList.contains("aberto");

  // Fecha todos
  document.querySelectorAll(".mito-item").forEach((el) => {
    el.classList.remove("aberto");
    el.querySelector(".mito-seta").textContent = "▼";
  });

  // Abre o clicado (se não estava aberto)
  if (!estaAberto) {
    item.classList.add("aberto");
    item.querySelector(".mito-seta").textContent = "▲";
  }
}

// ── ABA: PASSOS ──────────────────────────────
function renderizarPassos(area, passos) {
  const itensHtml = passos
    .map(
      (p) => `
    <div class="passo-item">
      <div class="passo-num">${p.num}</div>
      <div class="passo-conteudo">
        <div class="passo-header">
          <span class="passo-emoji">${p.emoji}</span>
          <span class="passo-titulo">${p.titulo}</span>
        </div>
        <div class="passo-desc">${p.desc}</div>
      </div>
    </div>
  `
    )
    .join("");

  area.innerHTML = `
    <div class="label-secao">O que fazer — passo a passo</div>
    <div class="passos-dica">Se você está sofrendo violência, siga esses passos:</div>
    <div class="passos-lista">${itensHtml}</div>
    <div class="passos-emergencia">
      🆘 Em perigo agora? Ligue <strong>190</strong> (Polícia) ou <strong>180</strong> (Central da Mulher).<br>
      São gratuitos, sigilosos e funcionam 24h.
    </div>
  `;
}

// ============================================
//  MODAL DE SINAIS
// ============================================

async function abrirModal(idSinal) {
  try {
    // Busca o sinal específico pelo ID no JSON Server
    const resposta = await fetch(`${API_URL}/sinais/${idSinal}`);
    const sinal = await resposta.json();

    const itemsHtml = sinal.items
      .map(
        (it) => `
      <div class="modal-item">
        <span style="flex-shrink:0;">${it.icon}</span>
        <span>${it.texto}</span>
      </div>
    `
      )
      .join("");

    document.getElementById("modal-emoji-box").style.background = sinal.cor;
    document.getElementById("modal-emoji").textContent = sinal.emoji;
    document.getElementById("modal-titulo").textContent = sinal.titulo;
    document.getElementById("modal-sabia").textContent = "📌 " + sinal.sabia;
    document.getElementById("modal-items").innerHTML = itemsHtml;
    document.getElementById("modal-frase").textContent = sinal.frase;

    document.getElementById("modal").classList.remove("oculto");
  } catch (erro) {
    console.error("Erro ao abrir modal:", erro);
  }
}

function fecharModal() {
  document.getElementById("modal").classList.add("oculto");
}

// Fecha modal ao clicar fora
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("modal").addEventListener("click", function (e) {
    if (e.target === this) fecharModal();
  });
});

// ============================================
//  BOTÃO 180
// ============================================

function ligar180() {
  alert(
    "📞 LIGUE 180 — Central de Atendimento à Mulher\n\n✅ Gratuito\n✅ Sigiloso\n✅ 24 horas por dia\n✅ Funciona em todo o Brasil\n\nVocê pode ligar de qualquer telefone!"
  );
}

// ============================================
//  SVG ILUSTRAÇÃO
// ============================================

function svgIlustracao() {
  return `
    <svg viewBox="0 0 120 210" width="115" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="195" rx="50" ry="14" fill="#e8d5f5" opacity="0.5"/>
      <circle cx="82" cy="68" r="17" fill="#f4c4a0"/>
      <ellipse cx="82" cy="58" rx="18" ry="12" fill="#2c1a0e"/>
      <rect x="68" y="83" width="28" height="38" rx="10" fill="#9c6fbe"/>
      <line x1="68" y1="90" x2="48" y2="112" stroke="#f4c4a0" stroke-width="7" stroke-linecap="round"/>
      <line x1="96" y1="90" x2="108" y2="110" stroke="#f4c4a0" stroke-width="7" stroke-linecap="round"/>
      <circle cx="48" cy="85" r="15" fill="#ffcc99"/>
      <ellipse cx="48" cy="76" rx="16" ry="11" fill="#5c3317"/>
      <rect x="36" y="99" width="24" height="36" rx="9" fill="#e07060"/>
      <line x1="36" y1="106" x2="24" y2="122" stroke="#ffcc99" stroke-width="6" stroke-linecap="round"/>
      <path d="M43 90 Q48 94 53 90" stroke="#c06000" stroke-width="2" fill="none"/>
      <circle cx="44" cy="87" r="2" fill="#555"/>
      <circle cx="52" cy="87" r="2" fill="#555"/>
      <circle cx="33" cy="142" r="11" fill="#f4c4a0"/>
      <ellipse cx="33" cy="135" rx="11" ry="8" fill="#3d2400"/>
      <rect x="24" y="152" width="18" height="26" rx="7" fill="#f48fb1"/>
      <path d="M29 147 Q33 151 37 147" stroke="#c06000" stroke-width="1.5" fill="none"/>
      <text x="95" y="50" font-size="12" opacity="0.7">💜</text>
      <text x="14" y="76" font-size="10" opacity="0.6">💛</text>
      <text x="100" y="135" font-size="10" opacity="0.6">💜</text>
      <rect x="2" y="182" width="116" height="21" rx="8" fill="#f3e5f5"/>
      <text x="60" y="197" font-size="8.5" fill="#7b1fa2" text-anchor="middle" font-family="Arial" font-weight="bold">Você não está sozinha 💜</text>
    </svg>
  `;
}
