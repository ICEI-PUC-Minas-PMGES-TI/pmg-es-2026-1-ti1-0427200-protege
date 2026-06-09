const tipoLabel = { audio: "Áudio", foto: "Foto", video: "Vídeo", documento: "Documento" };

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

fetch("../db/db.json")
  .then(res => res.json())
  .then(data => {
    const p = data.provas.find(x => x.id === id);
    if (!p) {
      document.getElementById("conteudoDetalhe").innerHTML =
        "<p style='color:red'>Prova não encontrada.</p>";
      return;
    }
    renderDetalhe(p);
  })
  .catch(err => {
    console.error("Erro:", err);
    document.getElementById("conteudoDetalhe").innerHTML =
      "<p style='color:red'>Erro ao carregar os dados.</p>";
  });
function renderDetalhe(p) {
  document.getElementById("conteudoDetalhe").innerHTML = `
    <div class="card-detalhe">
      <span class="card-tipo tipo-${p.tipo}">${tipoLabel[p.tipo]}</span>
      <h2>${p.titulo}</h2>
      <p class="detalhe-desc">${p.descricao}</p>
      <div class="detalhe-info">
        <div class="detalhe-linha">
          <span class="detalhe-label">Data:</span> ${p.data}
        </div>
        <div class="detalhe-linha">
          <span class="detalhe-label">Arquivo:</span>
          <a class="detalhe-arquivo" href="#">${p.arquivo}</a>
        </div>
        <div class="detalhe-linha">
          <span class="detalhe-label">Tamanho:</span> ${p.tamanho}
        </div>
        ${p.duracao ? `
        <div class="detalhe-linha">
          <span class="detalhe-label">Duração:</span> ${p.duracao}
        </div>` : ""}
      </div>
      <button class="btn-voltar" onclick="window.location.href='index.html'">← Voltar</button>
    </div>
  `;
}
