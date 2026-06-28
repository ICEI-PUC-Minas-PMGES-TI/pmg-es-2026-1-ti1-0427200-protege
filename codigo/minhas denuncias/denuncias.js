const lista = document.getElementById("listaDenuncias");
const contador = document.getElementById("contador");

fetch("http://localhost:3001/provas")
.then(res => res.json())
.then(itens => {

    contador.textContent = `Total de denúncias: ${itens.length}`;

    let html = "";

    itens.forEach((item) => {

        let classeStatus = "";
        let classeIcone = "";
        let icone = "";

        switch (item.status) {

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

            default:
                classeStatus = "arquivada";
                classeIcone = "roxo";
                icone = "✕";
        }

        html += `

        <div class="card" data-id="${item.id}">

            <div class="esquerda">

                <div class="icone ${classeIcone}">
                    ${icone}
                </div>

                <div class="info">

                    <h2>${item.titulo}</h2>

                    <p>${item.descricao}</p>

                    <p><strong>Tipo:</strong> ${item.tipo}</p>

                    <p><strong>Data:</strong> ${item.data}</p>

                </div>

            </div>

            <div class="direita">

                <span class="status ${classeStatus}">
                    ${item.status}
                </span>

                <p class="protocolo">
                    ${item.protocolo || "—"}
                </p>

                <button class="btn-detalhes">
                    Ver detalhes
                </button>

            </div>

        </div>

        `;

    });

    lista.innerHTML = html || "<p>Nenhuma denúncia encontrada.</p>";

})
.catch(err => {
    console.error(err);
    lista.innerHTML = "<p>Erro ao carregar as denúncias.</p>";
});

document.addEventListener("click", (e) => {

    if (!e.target.classList.contains("btn-detalhes")) return;

    const card = e.target.closest(".card");
    const id = card.getAttribute("data-id");

    fetch(`http://localhost:3001/provas/${id}`)
        .then(res => res.json())
        .then(item => {

            // Se tiver um arquivo anexado, leva pra tela de detalhes da prova
            if (item.arquivoURL) {
                window.location.href = `../page-detalhes-provas/detalhes.html?id=${id}`;
            } else {
                alert(`Protocolo: ${item.protocolo || "—"}\nEsta denúncia está registrada e pode ser acompanhada pelo protocolo.`);
            }

        })
        .catch(err => console.error(err));

});
