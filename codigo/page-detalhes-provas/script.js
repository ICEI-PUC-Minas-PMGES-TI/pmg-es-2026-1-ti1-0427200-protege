const tipoLabel = { audio: "Áudio", foto: "Foto", video: "Vídeo", documento: "Documento" };

fetch("../db/db.json")
  .then(res => res.json())
  .then(data => {
    renderCards(data.provas);
  })
  .catch(err => {
    console.error("Erro ao carregar db.json:", err);
    document.getElementById("listaProvas").innerHTML =
      "<p style='color:red'>Erro ao carregar as provas.</p>";
  });

function renderCards(provas) {
  const lista = document.getElementById("listaProvas");
  lista.innerHTML = provas.map(p => `
    <div class="card">
      <span class="card-tipo tipo-${p.tipo}">${tipoLabel[p.tipo]}</span>
      <h3>${p.titulo}</h3>
      <p>${p.descricao.substring(0, 80)}...</p>
      <span class="card-data">📅 ${p.data}</span>
      <button class="btn-detalhes" onclick="verDetalhes(${p.id})">Ver detalhes</button>
    </div>
  `).join("");
}

function verDetalhes(id) {
  window.location.href = `detalhes.html?id=${id}`;
}

function abrirModal(id) {
  const p = window.provasCache.find(x => x.id === id);
  if (!p) return;
  document.getElementById("detalhesProva").innerHTML = `
    <span class="detalhe-tipo tipo-${p.tipo}">${tipoLabel[p.tipo]}</span>
    <p class="detalhe-titulo">${p.titulo}</p>
    <p class="detalhe-desc">${p.descricao}</p>
    <div class="detalhe-info">
      <div class="detalhe-linha"><span class="detalhe-label">Data:</span> ${p.data}</div>
      <div class="detalhe-linha"><span class="detalhe-label">Arquivo:</span>
        <a class="detalhe-arquivo" href="#">${p.arquivo}</a>
      </div>
      <div class="detalhe-linha"><span class="detalhe-label">Tamanho:</span> ${p.tamanho}</div>
      ${p.duracao ? `<div class="detalhe-linha"><span class="detalhe-label">Duração:</span> ${p.duracao}</div>` : ""}
    </div>
  `;
  document.getElementById("modal").classList.add("ativo");
}

