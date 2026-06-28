
// ── CONFIGURAÇÃO ──────────────────────────────────────────
var GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + GEMINI_KEY;
var JSON_SERVER = "http://localhost:3002/sessoes";

var SYSTEM_PROMPT = "Você é um assistente de apoio para vítimas de violência doméstica. " +
  "Responda SEMPRE em português brasileiro, com linguagem simples, curta e acolhedora (máximo 2 linhas). " +
  "Nunca minimize a situação. Após sua resposta, faça UMA pergunta que possa ser respondida com SIM ou NÃO. " +
  "Perguntas guia (use nessa ordem): situação de perigo imediato, agressor mora junto, ameaças frequentes, filhos em risco, rede de apoio. " +
  "Quando a pessoa tiver respondido 5 perguntas, encerre com orientações e mencione o número 180.";

// ── PERGUNTAS FALLBACK ────────────────────────────────────
var perguntas = [
  "Você está em perigo imediato agora?",
  "O agressor mora com você?",
  "Você sofre ameaças ou humilhações com frequência?",
  "Seus filhos ou familiares também estão em risco?",
  "Você tem alguém de confiança para pedir ajuda?"
];

var respostasSim = [
  "Entendo. Sua segurança é o mais importante agora 💜",
  "Isso torna a situação mais delicada. Você não está sozinha.",
  "Ameaças são violência. Você merece se sentir segura.",
  "Vamos considerar isso na sua orientação.",
  "Que bom. Ter apoio faz muita diferença 💜"
];

var respostasNao = [
  "Ainda assim, estamos aqui para te ajudar 💜",
  "Isso pode facilitar algumas medidas de proteção.",
  "Qualquer situação de violência merece atenção.",
  "Fico feliz por eles estarem seguros.",
  "Mesmo assim, existem serviços que podem te ajudar."
];

// ── ESTADO ────────────────────────────────────────────────
var historicoGemini = [];

var estado = {
  etapa: 0,
  risco: 0,
  respostas: [],
  encerrado: false,
  modoIA: true
};

var chatEl = document.getElementById("chat");

// ── GEMINI ────────────────────────────────────────────────
async function chamarGemini(mensagem) {
  historicoGemini.push({ role: "user", parts: [{ text: mensagem }] });

  var res = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: historicoGemini
    })
  });

  if (!res.ok) throw new Error("Erro " + res.status);

  var data = await res.json();
  var resposta = data.candidates[0].content.parts[0].text;

  historicoGemini.push({ role: "model", parts: [{ text: resposta }] });
  return resposta;
}

// ── JSON SERVER ───────────────────────────────────────────
async function salvarNoServidor(sessao) {
  try {
    await fetch(JSON_SERVER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sessao)
    });
    console.log("💜 Sessão salva no JSON Server:", sessao);
  } catch {
    // se o servidor não estiver rodando, salva no localStorage como backup
    var sessoes = JSON.parse(localStorage.getItem("sessoes_backup") || "[]");
    sessoes.push(sessao);
    localStorage.setItem("sessoes_backup", JSON.stringify(sessoes));
    console.log("⚠️ JSON Server offline, salvo no localStorage.");
  }
}

async function buscarSessoes() {
  try {
    var res = await fetch(JSON_SERVER);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    // fallback: busca do localStorage
    return JSON.parse(localStorage.getItem("sessoes_backup") || "[]");
  }
}

async function deletarTodasSessoes() {
  try {
    var sessoes = await buscarSessoes();
    for (var s of sessoes) {
      await fetch(JSON_SERVER + "/" + s.id, { method: "DELETE" });
    }
  } catch {
    localStorage.removeItem("sessoes_backup");
  }
}

// ── DOM ───────────────────────────────────────────────────
function adicionarMsg(texto, tipo) {
  var wrapper = document.createElement("div");
  wrapper.classList.add("msg-wrapper", tipo);

  if (tipo === "bot") {
    var avatar = document.createElement("div");
    avatar.classList.add("msg-avatar");
    avatar.innerHTML = "💜";
    wrapper.appendChild(avatar);
  }

  var div = document.createElement("div");
  div.classList.add("msg", tipo);
  div.innerHTML = texto.replace(/\n/g, "<br>");
  wrapper.appendChild(div);

  chatEl.appendChild(wrapper);
  chatEl.scrollTop = chatEl.scrollHeight;
}

function mostrarDigitando() {
  var wrapper = document.createElement("div");
  wrapper.classList.add("msg-wrapper", "bot");
  wrapper.id = "typing-indicator";

  var avatar = document.createElement("div");
  avatar.classList.add("msg-avatar");
  avatar.innerHTML = "💜";
  wrapper.appendChild(avatar);

  var div = document.createElement("div");
  div.classList.add("msg", "bot");
  div.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
  wrapper.appendChild(div);

  chatEl.appendChild(wrapper);
  chatEl.scrollTop = chatEl.scrollHeight;
}

function removerDigitando() {
  var el = document.getElementById("typing-indicator");
  if (el) el.remove();
}

function desabilitarBotoes() {
  var row = document.getElementById("btnRow");
  if (row) row.classList.add("disabled");
}

function habilitarBotoes() {
  var row = document.getElementById("btnRow");
  if (row) row.classList.remove("disabled");
}

function setStatus(texto, tipo) {
  var el = document.getElementById("statusBar");
  if (!el) return;
  el.textContent = "• " + texto;
  el.className = "header-status " + tipo;
}

// ── RISCO ─────────────────────────────────────────────────
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

// ── FLUXO ─────────────────────────────────────────────────
async function iniciarChat() {
  estado = { etapa: 0, risco: 0, respostas: [], encerrado: false, modoIA: true };
  historicoGemini = [];
  setStatus("Conectando...", "");

  setTimeout(async function() {
    adicionarMsg("Olá 💜 Este é um chat seguro e anônimo.\nNenhum dado pessoal seu é coletado.", "bot");

    setTimeout(async function() {
      mostrarDigitando();
      try {
        var resp = await chamarGemini("Olá, preciso de apoio.");
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
    pergunta: estado.modoIA ? obterUltimaPergunta() : perguntas[estado.etapa],
    resposta: resposta,
    horario: new Date().toLocaleString("pt-BR")
  });

  avaliarRisco(resposta, estado.etapa);
  estado.etapa++;

  setTimeout(async function() {
    mostrarDigitando();

    if (estado.modoIA) {
      try {
        var encerrar = estado.etapa >= 5 ? " [encerre com orientações e mencione o 180]" : "";
        var resp = await chamarGemini('Resposta: "' + resposta + '"' + encerrar);
        removerDigitando();
        adicionarMsg(resp, "bot");
        if (estado.etapa >= 5) finalizarFluxo();
        else habilitarBotoes();
      } catch {
        removerDigitando();
        estado.modoIA = false;
        setStatus("Modo offline", "offline");
        continuarOffline();
      }
    } else {
      setTimeout(function() {
        removerDigitando();
        var acolhimento = resposta === "Sim" ? respostasSim[estado.etapa - 1] : respostasNao[estado.etapa - 1];
        adicionarMsg(acolhimento, "bot");
        setTimeout(function() {
          if (estado.etapa < perguntas.length) {
            mostrarDigitando();
            setTimeout(function() {
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

function obterUltimaPergunta() {
  for (var i = historicoGemini.length - 1; i >= 0; i--) {
    if (historicoGemini[i].role === "model") {
      var texto = historicoGemini[i].parts[0].text;
      var linhas = texto.split("\n").filter(function(l) { return l.trim(); });
      return linhas[linhas.length - 1].replace(/\*\*/g, "").trim();
    }
  }
  return perguntas[estado.etapa - 1] || "";
}

function continuarOffline() {
  if (estado.etapa < perguntas.length) {
    adicionarMsg(perguntas[estado.etapa], "bot");
    habilitarBotoes();
  } else {
    finalizarFluxo();
  }
}

// ── FINALIZAR ─────────────────────────────────────────────
function finalizarFluxo() {
  estado.encerrado = true;

  if (!estado.modoIA) {
    mostrarDigitando();
    setTimeout(function() {
      removerDigitando();
      adicionarMsg("Obrigada por confiar em mim 💜", "bot");
      setTimeout(function() {
        salvarESostrarRelatorio();
      }, 800);
    }, 1000);
  } else {
    setTimeout(function() {
      salvarESostrarRelatorio();
    }, 1200);
  }
}

async function salvarESostrarRelatorio() {
  var sessao = {
    data: new Date().toLocaleString("pt-BR"),
    nivel_risco: getNivelRisco(),
    pontuacao_risco: estado.risco,
    modo: estado.modoIA ? "ia" : "offline",
    respostas: estado.respostas
  };

  await salvarNoServidor(sessao);
  mostrarRelatorio(sessao);
}

// ── RELATÓRIO ─────────────────────────────────────────────
function mostrarRelatorio(sessao) {
  var nivel = sessao.nivel_risco;
  var textoRisco = { alto: "🔴 Alto Risco", medio: "🟡 Risco Moderado", baixo: "🟢 Baixo Risco" }[nivel];

  var mensagemNivel = {
    alto: '<p style="color:#dc2626;font-weight:bold;font-size:0.88rem;margin-bottom:8px;">⚠️ Situação de risco elevado — busque ajuda o quanto antes.</p>',
    medio: '<p style="color:#d97706;font-weight:bold;font-size:0.88rem;margin-bottom:8px;">⚡ Situação que merece atenção — você não precisa enfrentar isso sozinha.</p>',
    baixo: '<p style="color:#059669;font-weight:bold;font-size:0.88rem;margin-bottom:8px;">💚 Risco baixo no momento — mas você sempre merece apoio e proteção.</p>'
  }[nivel];

  var tabelaHtml = sessao.respostas.map(function(r) {
    return '<div class="sessao-pergunta"><span class="perg-text">' + r.pergunta + '</span><span class="perg-resp">' + r.resposta + '</span></div>';
  }).join("");

  var recursosHtml = '<div style="margin-top:14px;border-top:1px solid #ede9fe;padding-top:12px;">' +
    '<p style="font-weight:bold;color:#4c1d95;font-size:0.82rem;margin-bottom:10px;">📋 Recursos disponíveis para você:</p>' +
    '<div style="display:flex;flex-direction:column;gap:8px;">' +
    '<div style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:10px;padding:10px 12px;"><p style="font-weight:bold;color:#6d28d9;font-size:0.82rem;">📞 Central de Atendimento à Mulher</p><p style="color:#7c3aed;font-size:1rem;font-weight:bold;letter-spacing:3px;margin:2px 0;">180</p><p style="color:#9ca3af;font-size:0.72rem;">Gratuito • Sigiloso • 24h por dia</p></div>' +
    '<div style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:10px;padding:10px 12px;"><p style="font-weight:bold;color:#6d28d9;font-size:0.82rem;">🚨 Emergência policial</p><p style="color:#7c3aed;font-size:1rem;font-weight:bold;letter-spacing:3px;margin:2px 0;">190</p><p style="color:#9ca3af;font-size:0.72rem;">Para situações de perigo imediato</p></div>' +
    '<div style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:10px;padding:10px 12px;"><p style="font-weight:bold;color:#6d28d9;font-size:0.82rem;">💬 Apoio emocional — CVV</p><p style="color:#7c3aed;font-size:1rem;font-weight:bold;letter-spacing:3px;margin:2px 0;">188</p><p style="color:#9ca3af;font-size:0.72rem;">Gratuito • Sigiloso • cvv.org.br</p></div>' +
    '<div style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:10px;padding:10px 12px;"><p style="font-weight:bold;color:#6d28d9;font-size:0.82rem;">⚖️ Lei Maria da Penha</p><p style="color:#6b7280;font-size:0.78rem;margin-top:3px;line-height:1.5;">Você tem direito a medida protetiva de urgência, afastamento do agressor e assistência jurídica gratuita.</p></div>' +
    '<div style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:10px;padding:10px 12px;"><p style="font-weight:bold;color:#6d28d9;font-size:0.82rem;">🏥 Delegacia da Mulher</p><p style="color:#6b7280;font-size:0.78rem;margin-top:3px;line-height:1.5;">Você pode registrar um B.O. mesmo sem marcas visíveis. Ameaças e violência psicológica também são crimes.</p></div>' +
    '</div></div>';

  var html = '<div class="relatorio"><h3>📊 Resumo da Conversa</h3>' + mensagemNivel +
    '<p style="color:#6b7280;font-size:0.8rem;">Nível: <span class="risco-' + nivel + '">' + textoRisco + '</span></p>' +
    '<p style="margin:6px 0 10px;font-size:0.75rem;color:#9ca3af;">📅 ' + sessao.data + '</p>' +
    tabelaHtml + recursosHtml + '</div>';

  var wrapper = document.createElement("div");
  wrapper.classList.add("msg-wrapper", "bot");
  var div = document.createElement("div");
  div.style.maxWidth = "100%";
  div.style.width = "100%";
  div.innerHTML = html;
  wrapper.appendChild(div);
  chatEl.appendChild(wrapper);
  chatEl.scrollTop = chatEl.scrollHeight;

  var inputArea = document.getElementById("inputArea");
  inputArea.innerHTML = '<button onclick="reiniciarConversa()" style="width:100%;padding:13px;background:#6f42c1;border:none;border-radius:12px;font-size:0.9rem;font-weight:bold;color:white;cursor:pointer;">🔄 Iniciar nova conversa</button>';
}

// ── HISTÓRICO ─────────────────────────────────────────────
function abrirHistorico() {
  mostrarTela("screen-historico");
  renderizarHistorico();
}

function fecharHistorico() {
  mostrarTela("screen-intro");
}

async function limparHistorico() {
  if (confirm("Tem certeza? Todos os dados serão apagados.")) {
    await deletarTodasSessoes();
    renderizarHistorico();
  }
}

async function renderizarHistorico() {
  var container = document.getElementById("historicoDados");
  container.innerHTML = '<p style="text-align:center;color:#999;padding:20px;font-size:0.85rem;">Carregando...</p>';

  var sessoes = await buscarSessoes();

  if (sessoes.length === 0) {
    container.innerHTML = '<div class="empty-state"><p>Nenhuma sessão registrada ainda.</p></div>';
    return;
  }

  container.innerHTML = sessoes.slice().reverse().map(function(s) {
    var nivel = s.nivel_risco || "baixo";
    var textoNivel = { alto: "Alto Risco", medio: "Risco Moderado", baixo: "Baixo Risco" }[nivel];
    var pergs = (s.respostas || []).map(function(r) {
      return '<div class="sessao-pergunta"><span class="perg-text">' + r.pergunta + '</span><span class="perg-resp">' + r.resposta + '</span></div>';
    }).join("");
    return '<div class="sessao-card"><div class="sessao-header"><span class="sessao-titulo">Sessão</span><span class="sessao-risco ' + nivel + '">' + textoNivel + '</span></div><div class="sessao-data">📅 ' + s.data + ' • ' + (s.modo === "ia" ? "IA Gemini" : "offline") + '</div><div style="margin-top:10px">' + pergs + '</div></div>';
  }).join("");
}

// para conseguir reniciar
function reiniciarConversa() {
  chatEl.innerHTML = "";
  var inputArea = document.getElementById("inputArea");
  inputArea.innerHTML = '<div class="btn-row" id="btnRow"><button class="btn-sim" onclick="responder(\'Sim\')">SIM</button><button class="btn-nao" onclick="responder(\'Não\')">NÃO</button></div>';
  iniciarChat();
}

// paraconseguir navegarr 
function mostrarTela(id) {
  document.querySelectorAll(".screen").forEach(function(el) { el.classList.add("hidden"); });
  document.getElementById(id).classList.remove("hidden");
}

function iniciarApp() {
  mostrarTela("screen-chat");
  iniciarChat();
}

function voltarIntro() {
  if (confirm("Deseja sair da conversa?")) mostrarTela("screen-intro");
}

document.getElementById("btnHistorico").addEventListener("click", abrirHistorico);

console.log("💜 Chat de Apoio carregado");
