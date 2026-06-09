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
