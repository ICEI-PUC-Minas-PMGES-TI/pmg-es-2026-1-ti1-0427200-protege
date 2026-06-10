const denuncias = [
  {
    titulo: "Violência doméstica",
    data: "08/06/2026",
    tipo: "Agressão física",
    descricao: "Relato de agressão física em ambiente familiar.",
    prioridade: "Alta",
    responsavel: "Delegacia Especializada da Mulher",
    ultimaAtualizacao: "10/06/2026 14:30",
    status: "Em andamento",
    protocolo: "DEN-2026-001"
  },

  {
    titulo: "Assédio moral",
    data: "05/06/2026",
    tipo: "Assédio",
    descricao: "Denúncia de assédio recorrente no ambiente de trabalho.",
    prioridade: "Média",
    responsavel: "Ministério Público",
    ultimaAtualizacao: "09/06/2026 11:20",
    status: "Em avaliação",
    protocolo: "DEN-2026-002"
  },

  {
    titulo: "Violência psicológica",
    data: "28/05/2026",
    tipo: "Ameaças",
    descricao: "Registro de ameaças e intimidações frequentes.",
    prioridade: "Alta",
    responsavel: "Delegacia Civil",
    ultimaAtualizacao: "04/06/2026 16:45",
    status: "Concluída",
    protocolo: "DEN-2026-003"
  },

  {
    titulo: "Violência patrimonial",
    data: "20/05/2026",
    tipo: "Danos materiais",
    descricao: "Destruição e retenção indevida de bens pessoais.",
    prioridade: "Baixa",
    responsavel: "Delegacia Civil",
    ultimaAtualizacao: "25/05/2026 09:10",
    status: "Arquivada",
    protocolo: "DEN-2026-004"
  }
];

const lista = document.getElementById("listaDenuncias");

const total = document.createElement("p");
total.style.marginBottom = "20px";
total.style.color = "#666";
total.style.fontWeight = "bold";
total.textContent = `Total de denúncias registradas: ${denuncias.length}`;

document.querySelector(".container").insertBefore(
  total,
  document.getElementById("listaDenuncias")
);

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

          <p>${denuncia.descricao}</p>

          <p>
            <strong>Tipo:</strong> ${denuncia.tipo}
          </p>

          <p>
            <strong>Prioridade:</strong> ${denuncia.prioridade}
          </p>

          <p>
            <strong>Responsável:</strong> ${denuncia.responsavel}
          </p>

          <p>
            <strong>Última atualização:</strong>
            ${denuncia.ultimaAtualizacao}
          </p>
        </div>

      </div>

      <div class="direita">

        <span class="status ${classeStatus}">
          ${denuncia.status}
        </span>

        <p class="protocolo">
          Protocolo: ${denuncia.protocolo}
        </p>

        <button class="btn-detalhes">
          Ver detalhes
        </button>

      </div>

    </div>
  `;
});

document.addEventListener("click", (e) => {

  if (e.target.classList.contains("btn-detalhes")) {

    alert(
      "Esta denúncia está registrada no sistema e seu andamento pode ser acompanhado pelo protocolo informado."
    );

  }

});