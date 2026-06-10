const denuncias = [
  {
    titulo: "Violência doméstica",
    data: "08/06/2026",
    tipo: "Agressão física",
    status: "Em andamento",
    protocolo: "DEN-2026-001"
  },
  {
    titulo: "Assédio moral",
    data: "05/06/2026",
    tipo: "Assédio",
    status: "Em avaliação",
    protocolo: "DEN-2026-002"
  },
  {
    titulo: "Violência psicológica",
    data: "28/05/2026",
    tipo: "Ameaças",
    status: "Concluída",
    protocolo: "DEN-2026-003"
  },
  {
    titulo: "Violência patrimonial",
    data: "20/05/2026",
    tipo: "Danos materiais",
    status: "Arquivada",
    protocolo: "DEN-2026-004"
  }
];
const lista = document.getElementById("listaDenuncias");

denuncias.forEach((denuncia) => {

  let classeStatus = "";
  let classeIcone = "";
  let icone = "";

  switch (denuncia.status) {
    case "Em andamento":
      classeStatus = "andamento";
      classeIcone = "vermelho";
      icone = "!";
      break;

    case "Em avaliação":
      classeStatus = "avaliacao";
      classeIcone = "amarelo";
      icone = "?";
      break;

    case "Concluída":
      classeStatus = "concluida";
      classeIcone = "verde";
      icone = "✓";
      break;

    case "Arquivada":
      classeStatus = "arquivada";
      classeIcone = "roxo";
      icone = "✕";
      break;
  }
  lista.innerHTML += `
    <div class="card">

      <div class="esquerda">

        <div class="icone ${classeIcone}">
          ${icone}
        </div>

        <div class="info">
          <h2>${denuncia.titulo}</h2>
          <p>Registrada em ${denuncia.data}</p>
          <span class="tipo">${denuncia.tipo}</span>
        </div>

      </div>

      <div class="direita">
        <span class="status ${classeStatus}">
          ${denuncia.status}
        </span>

        <p class="protocolo">
          Protocolo: ${denuncia.protocolo}
        </p>
      </div>

    </div>
  `;
});