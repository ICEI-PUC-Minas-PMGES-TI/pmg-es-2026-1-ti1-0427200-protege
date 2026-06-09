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