const GEMINI_KEY = "AIzaSyBaonjwZT69EYU7VCDZc3ZJA_bCE0GShVw";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`;

const SYSTEM_PROMPT = `Você é um assistente de apoio para vítimas de violência doméstica.
Responda SEMPRE em português brasileiro, com linguagem simples, curta e acolhedora (máximo 2 linhas).
Nunca minimize a situação. Após sua resposta, faça UMA pergunta que possa ser respondida com SIM ou NÃO.
Perguntas guia (use nessa ordem, adaptando): situação de perigo imediato, agressor mora junto, ameaças frequentes, filhos em risco, rede de apoio disponível.
Quando a pessoa tiver respondido 5 perguntas, encerre com orientações claras mencionando o número 180.`;

let historicoGemini = [];

async function chamarGemini(mensagem) {
  historicoGemini.push({ role: "user", parts: [{ text: mensagem }] });

  const res = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: historicoGemini
    })
  });

  if (!res.ok) throw new Error("Erro Gemini: " + res.status);

  const data = await res.json();
  const resposta = data.candidates[0].content.parts[0].text;

  historicoGemini.push({ role: "model", parts: [{ text: resposta }] });
  return resposta;
}

// ── PERGUNTAS FALLBACK (se API falhar) ────────────────────
const perguntas = [
  "Você está em perigo imediato agora?",
  "O agressor mora com você?",
  "Você sofre ameaças ou humilhações com frequência?",
  "Seus filhos ou familiares também estão em risco?",
  "Você tem alguém de confiança para pedir ajuda?"
];

const respostasSim = [
  "Entendo. Sua segurança é o mais importante agora 💜",
  "Isso torna a situação mais delicada. Você não está sozinha.",
  "Ameaças são violência. Você merece se sentir segura.",
  "Vamos considerar isso na sua orientação.",
  "Que bom. Ter apoio faz muita diferença 💜"
];

const respostasNao = [
  "Ainda assim, estamos aqui para te ajudar 💜",
  "Isso pode facilitar algumas medidas de proteção.",
  "Qualquer situação de violência merece atenção.",
  "Fico feliz por eles estarem seguros.",
  "Mesmo assim, existem serviços especializados que podem te ajudar."
];

// ── ESTADO ────────────────────────────────────────────────
let estado = {
  etapa: 0,
  risco: 0,
  respostas: [],
  encerrado: false,
  modoIA: true
};

const chatEl = document.getElementById("chat");

// ── MENSAGENS ─────────────────────────────────────────────
function adicionarMsg(texto, tipo, classe = "") {
  const wrapper = document.createElement("div");
  wrapper.classList.add("msg-wrapper", tipo);

  if (tipo === "bot") {
    const avatar = document.createElement("div");
    avatar.classList.add("msg-avatar");
    avatar.innerHTML = "💜";
    wrapper.appendChild(avatar);
  }

  const div = document.createElement("div");
  div.classList.add("msg", tipo);
  if (classe) div.classList.add(classe);
  div.innerHTML = texto.replace(/\n/g, "<br>");
  wrapper.appendChild(div);

  chatEl.appendChild(wrapper);
  chatEl.scrollTop = chatEl.scrollHeight;
}

function mostrarDigitando() {
  const wrapper = document.createElement("div");
  wrapper.classList.add("msg-wrapper", "bot");
  wrapper.id = "typing-indicator";

  const avatar = document.createElement("div");
  avatar.classList.add("msg-avatar");
  avatar.innerHTML = "💜";
  wrapper.appendChild(avatar);

  const div = document.createElement("div");
  div.classList.add("msg", "bot");
  div.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div>`;
  wrapper.appendChild(div);

  chatEl.appendChild(wrapper);
  chatEl.scrollTop = chatEl.scrollHeight;
}

function removerDigitando() {
  const el = document.getElementById("typing-indicator");
  if (el) el.remove();
}

function desabilitarBotoes() {
  const row = document.getElementById("btnRow");
  if (row) row.classList.add("disabled");
}

function habilitarBotoes() {
  const row = document.getElementById("btnRow");
  if (row) row.classList.remove("disabled");
}

function setStatus(texto, tipo) {
  const el = document.getElementById("statusBar");
  if (!el) return;
  el.textContent = "• " + texto;
  el.className = "header-status " + tipo;
}

// ── ver qual é o risco
function avaliarRisco(resposta, etapa) {
  if (resposta === "Sim") {
    if (etapa === 0) estado.risco += 3;
    else if (etapa === 3) estado.risco += 2;
    else estado.risco += 1;
  }
  if (resposta === "Não" && etapa === 4) estado.risco += 1;
}

function getNivelRisco() {
  if (estado.risco >= 4) return "alto";
  if (estado.risco >= 2) return "medio";
  return "baixo";
}

// ── FLUXO PRINCIPAL 
async function iniciarChat() {
  estado = { etapa: 0, risco: 0, respostas: [], encerrado: false, modoIA: true };
  historicoGemini = [];

  setStatus("Conectando...", "");

  setTimeout(async () => {
    adicionarMsg("Olá 💜 Este é um chat seguro e anônimo.\nNenhum dado pessoal seu é coletado.", "bot");

    setTimeout(async () => {
      mostrarDigitando();
      try {
        const resp = await chamarGemini("Olá, preciso de apoio.");
        removerDigitando();
        setStatus("IA conectada", "online");
        adicionarMsg(resp, "bot");
        habilitarBotoes();
      } catch {
        removerDigitando();
        estado.modoIA = false;
        setStatus("Modo offline", "offline");
        adicionarMsg(perguntas[estado.etapa], "bot");
        habilitarBotoes();
      }
    }, 700);
  }, 400);
}

async function responder(resposta) {
  if (estado.encerrado) return;

  desabilitarBotoes();
  adicionarMsg(resposta, "user");

  estado.respostas.push({
    id: estado.respostas.length + 1,
    pergunta: estado.modoIA
      ? obterUltimaPerguntaIA()
      : perguntas[estado.etapa],
    resposta: resposta,
    horario: new Date().toLocaleString("pt-BR")
  });

  avaliarRisco(resposta, estado.etapa);
  estado.etapa++;

  setTimeout(async () => {
    mostrarDigitando();

    if (estado.modoIA) {
      try {
        const encerrar = estado.etapa >= 5 ? " [encerre com orientações e mencione o 180]" : "";
        const resp = await chamarGemini(`Resposta: "${resposta}"${encerrar}`);
        removerDigitando();
        adicionarMsg(resp, "bot");

        if (estado.etapa >= 5) {
          finalizarFluxo();
        } else {
          habilitarBotoes();
        }
      } catch {
        removerDigitando();
        estado.modoIA = false;
        setStatus("Modo offline", "offline");
        continuarOffline();
      }
    } else {
      setTimeout(() => {
        removerDigitando();
        const acolhimento = resposta === "Sim"
          ? respostasSim[estado.etapa - 1]
          : respostasNao[estado.etapa - 1];
        adicionarMsg(acolhimento, "bot");

        setTimeout(() => {
          if (estado.etapa < perguntas.length) {
            mostrarDigitando();
            setTimeout(() => {
              removerDigitando();
              adicionarMsg(perguntas[estado.etapa], "bot");
              habilitarBotoes();
            }, 900);
          } else {
            finalizarFluxo();
          }
        }, 800);
      }, 1000);
    }
  }, 600);
}

function obterUltimaPerguntaIA() {
  for (let i = historicoGemini.length - 1; i >= 0; i--) {
    if (historicoGemini[i].role === "model") {
      const texto = historicoGemini[i].parts[0].text;
      const linhas = texto.split("\n").filter(l => l.trim());
      return linhas[linhas.length - 1].replace(/\*\*/g, "").trim();
    }
  }
  return perguntas[estado.etapa - 1] || "Pergunta anterior";
}

function continuarOffline() {
  if (estado.etapa < perguntas.length) {
    adicionarMsg(perguntas[estado.etapa], "bot");
    habilitarBotoes();
  } else {
    finalizarFluxo();
  }
}

// ── na hr de acabar as perguntas 
function finalizarFluxo() {
  estado.encerrado = true;

  if (!estado.modoIA) {
    mostrarDigitando();
    setTimeout(() => {
      removerDigitando();
      adicionarMsg("Obrigada por confiar em mim 💜", "bot");
      setTimeout(() => {
        const sessao = salvarSessao();
        mostrarRelatorio(sessao);
      }, 800);
    }, 1000);
  } else {
    setTimeout(() => {
      const sessao = salvarSessao();
      mostrarRelatorio(sessao);
    }, 1200);
  }
}

// ── ver o relatorio
function mostrarRelatorio(sessao) {
  const nivel = sessao.nivel_risco;
  const classeRisco = `risco-${nivel}`;
  const textoRisco = { alto: "🔴 Alto Risco", medio: "🟡 Risco Moderado", baixo: "🟢 Baixo Risco" }[nivel];

  const mensagemNivel = {
    alto: `<p style="color:#dc2626;font-weight:600;font-size:0.88rem;margin-bottom:8px;">⚠️ Situação de risco elevado — busque ajuda o quanto antes.</p>`,
    medio: `<p style="color:#d97706;font-weight:600;font-size:0.88rem;margin-bottom:8px;">⚡ Situação que merece atenção — você não precisa enfrentar isso sozinha.</p>`,
    baixo: `<p style="color:#059669;font-weight:600;font-size:0.88rem;margin-bottom:8px;">💚 Risco baixo no momento — mas você sempre merece apoio e proteção.</p>`
  }[nivel];

  const tabelaHtml = sessao.respostas.map(r =>
    `<div class="sessao-pergunta">
      <span class="perg-text">${r.pergunta}</span>
      <span class="perg-resp">${r.resposta}</span>
    </div>`
  ).join("");

  const recursosHtml = `
    <div style="margin-top:14px;border-top:1px solid #ede9fe;padding-top:12px;">
      <p style="font-weight:600;color:#4c1d95;font-size:0.82rem;margin-bottom:10px;">📋 Recursos disponíveis para você:</p>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:10px;padding:10px 12px;">
          <p style="font-weight:600;color:#6d28d9;font-size:0.82rem;">📞 Central de Atendimento à Mulher</p>
          <p style="color:#7c3aed;font-size:1rem;font-weight:700;letter-spacing:3px;margin:2px 0;">180</p>
          <p style="color:#9ca3af;font-size:0.72rem;">Gratuito • Sigiloso • 24h por dia</p>
        </div>
        <div style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:10px;padding:10px 12px;">
          <p style="font-weight:600;color:#6d28d9;font-size:0.82rem;">🚨 Emergência policial</p>
          <p style="color:#7c3aed;font-size:1rem;font-weight:700;letter-spacing:3px;margin:2px 0;">190</p>
          <p style="color:#9ca3af;font-size:0.72rem;">Para situações de perigo imediato</p>
        </div>
        <div style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:10px;padding:10px 12px;">
          <p style="font-weight:600;color:#6d28d9;font-size:0.82rem;">💬 Apoio emocional — CVV</p>
          <p style="color:#7c3aed;font-size:1rem;font-weight:700;letter-spacing:3px;margin:2px 0;">188</p>
          <p style="color:#9ca3af;font-size:0.72rem;">Gratuito • Sigiloso • cvv.org.br</p>
        </div>
        <div style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:10px;padding:10px 12px;">
          <p style="font-weight:600;color:#6d28d9;font-size:0.82rem;">⚖️ Lei Maria da Penha</p>
          <p style="color:#6b7280;font-size:0.78rem;margin-top:3px;line-height:1.5;">
            Você tem direito a medida protetiva de urgência, afastamento do agressor e assistência jurídica gratuita.
          </p>
        </div>
        <div style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:10px;padding:10px 12px;">
          <p style="font-weight:600;color:#6d28d9;font-size:0.82rem;">🏥 Delegacia da Mulher</p>
          <p style="color:#6b7280;font-size:0.78rem;margin-top:3px;line-height:1.5;">
            Você pode registrar um B.O. mesmo sem marcas visíveis. Ameaças e violência psicológica também são crimes.
          </p>
        </div>
      </div>
    </div>`;

  const html = `<div class="relatorio">
    <h3>📊 Resumo da Conversa</h3>
    ${mensagemNivel}
    <p style="color:#6b7280;font-size:0.8rem;">Nível identificado: <span class="${classeRisco}">${textoRisco}</span></p>
    <p style="margin:6px 0 10px;font-size:0.75rem;color:#9ca3af;">📅 ${sessao.data}</p>
    ${tabelaHtml}
    ${recursosHtml}
  </div>`;

  const wrapper = document.createElement("div");
  wrapper.classList.add("msg-wrapper", "bot");
  const div = document.createElement("div");
  div.style.maxWidth = "100%";
  div.style.width = "100%";
  div.innerHTML = html;
  wrapper.appendChild(div);
  chatEl.appendChild(wrapper);
  chatEl.scrollTop = chatEl.scrollHeight;

  const inputArea = document.getElementById("inputArea");
  inputArea.innerHTML = `
    <button onclick="reiniciarConversa()" style="width:100%;padding:13px;background:linear-gradient(135deg,#7c3aed,#6366f1);border:none;border-radius:12px;font-family:'DM Sans',sans-serif;font-size:0.9rem;font-weight:600;color:white;cursor:pointer;">
      🔄 Iniciar nova conversa
    </button>`;
}

// ─ armazenarr no jsnoo
function salvarSessao() {
  const sessao = {
    id: Date.now(),
    data: new Date().toLocaleString("pt-BR"),
    nivel_risco: getNivelRisco(),
    pontuacao_risco: estado.risco,
    modo: estado.modoIA ? "ia" : "offline",
    respostas: estado.respostas
  };

  let sessoes = [];
  try { sessoes = JSON.parse(localStorage.getItem("sessoes_apoio") || "[]"); }
  catch { sessoes = []; }

  sessoes.push(sessao);
  localStorage.setItem("sessoes_apoio", JSON.stringify(sessoes, null, 2));
  console.log("💜 Sessão salva:", sessao);
  return sessao;
}

function carregarSessoes() {
  try { return JSON.parse(localStorage.getItem("sessoes_apoio") || "[]"); }
  catch { return []; }
}

// ── conseguir verr o histórico
function abrirHistorico() {
  mostrarTela("screen-historico");
  renderizarHistorico();
}

function fecharHistorico() {
  mostrarTela("screen-intro");
}

function limparHistorico() {
  if (confirm("Tem certeza? Todos os dados serão apagados.")) {
    localStorage.removeItem("sessoes_apoio");
    renderizarHistorico();
  }
}

function renderizarHistorico() {
  const container = document.getElementById("historicoDados");
  const sessoes = carregarSessoes();

  if (sessoes.length === 0) {
    container.innerHTML = `<div class="empty-state">
      <svg viewBox="0 0 48 48" fill="none" stroke="#d1d5db" stroke-width="2" width="48" height="48">
        <path d="M12 6h24a2 2 0 012 2v32a2 2 0 01-2 2H12a2 2 0 01-2-2V8a2 2 0 012-2z"/>
        <path d="M16 16h16M16 22h16M16 28h10"/>
      </svg>
      <p>Nenhuma sessão registrada ainda.</p>
    </div>`;
    return;
  }

  container.innerHTML = [...sessoes].reverse().map(s => {
    const nivel = s.nivel_risco || "baixo";
    const textoNivel = { alto: "Alto Risco", medio: "Risco Moderado", baixo: "Baixo Risco" }[nivel];
    const pergs = (s.respostas || []).map(r =>
      `<div class="sessao-pergunta">
        <span class="perg-text">${r.pergunta}</span>
        <span class="perg-resp">${r.resposta}</span>
      </div>`
    ).join("");

    return `<div class="sessao-card">
      <div class="sessao-header">
        <span class="sessao-titulo">Sessão #${String(s.id).slice(-4)}</span>
        <span class="sessao-risco ${nivel}">${textoNivel}</span>
      </div>
      <div class="sessao-data">📅 ${s.data} • Modo: ${s.modo === "ia" ? "IA Gemini" : "offline"}</div>
      <div style="margin-top:10px">${pergs}</div>
    </div>`;
  }).join("");
}

// ── para reniciar a pagina
function reiniciarConversa() {
  chatEl.innerHTML = "";
  const inputArea = document.getElementById("inputArea");
  inputArea.innerHTML = `<div class="btn-row" id="btnRow">
    <button class="btn-sim" onclick="responder('Sim')">SIM</button>
    <button class="btn-nao" onclick="responder('Não')">NÃO</button>
  </div>`;
  iniciarChat();
}

// ── Npara cnsguirir navegar 
function mostrarTela(id) {
  document.querySelectorAll(".screen").forEach(el => el.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

function iniciarApp() {
  mostrarTela("screen-chat");
  iniciarChat();
}

function voltarIntro() {
  if (confirm("Deseja sair da conversa?")) {
    mostrarTela("screen-intro");
  }
}

// ── EVENT LISTENERS 
document.getElementById("btnHistorico").addEventListener("click", abrirHistorico);

console.log("💜 Chat de Apoio carregado");
console.log("Para ver os dados: JSON.parse(localStorage.getItem('sessoes_apoio'))");
