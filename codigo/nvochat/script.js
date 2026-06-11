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


let estado = {
  etapa: 0,
  risco: 0,
  respostas: [],
  encerrado: false,
  modoIA: true
};

const chatEl = document.getElementById("chat");


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