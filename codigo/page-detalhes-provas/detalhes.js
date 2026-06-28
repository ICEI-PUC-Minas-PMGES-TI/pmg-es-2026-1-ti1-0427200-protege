const tipoLabel = {
  audio: "Áudio",
  foto: "Foto",
  video: "Vídeo",
  documento: "Documento",
  denuncia: "Denúncia"
};

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`http://localhost:3001/provas/${id}`)
  .then(res => {
    if (!res.ok) throw new Error("Prova não encontrada");
    return res.json();
  })
  .then(p => {
    renderDetalhe(p);
  })
  .catch(err => {
    console.error("Erro:", err);
    document.getElementById("conteudoDetalhe").innerHTML =
      "<p style='color:red'>Prova não encontrada.</p>";
  });

function renderDetalhe(p) {
  document.getElementById("conteudoDetalhe").innerHTML = `
    <div class="card-detalhe">
      <span class="card-tipo tipo-${p.tipo}">${tipoLabel[p.tipo] || p.tipo}</span>
      <h2>${p.titulo}</h2>
      <p class="detalhe-desc">${p.descricao}</p>
      <div class="detalhe-info">

        <div class="detalhe-linha">
          <span class="detalhe-label">Data:</span> ${p.data}
        </div>

        ${p.arquivo ? `
        <div class="detalhe-linha">
          <span class="detalhe-label">Arquivo:</span>
          <a class="detalhe-arquivo" href="${p.arquivoURL || '#'}" target="_blank">${p.arquivo}</a>
        </div>` : ""}

        ${p.tamanho ? `
        <div class="detalhe-linha">
          <span class="detalhe-label">Tamanho:</span> ${p.tamanho}
        </div>` : ""}

        ${p.duracao ? `
        <div class="detalhe-linha">
          <span class="detalhe-label">Duração:</span> ${p.duracao}
        </div>` : ""}

        ${p.protocolo ? `
        <div class="detalhe-linha">
          <span class="detalhe-label">Protocolo:</span> ${p.protocolo}
        </div>` : ""}

      </div>
      <button class="btn-voltar" onclick="window.location.href='index.html'">← Voltar</button>
    </div>
  `;
}
