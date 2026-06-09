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
