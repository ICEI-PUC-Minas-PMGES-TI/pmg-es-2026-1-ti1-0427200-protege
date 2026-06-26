const lista = document.getElementById("listaDenuncias");
const contador = document.getElementById("contador");

fetch("http://localhost:3000/denuncias")
.then(res => res.json())
.then(denuncias=>{

    contador.textContent =
    `Total de denúncias: ${denuncias.length}`;

    let html="";

    denuncias.forEach((denuncia)=>{

        let classeStatus="";
        let classeIcone="";
        let icone="";

        switch(denuncia.status){

            case "Em andamento":
                classeStatus="andamento";
                classeIcone="vermelho";
                icone="!";
            break;

            case "Em avaliação":
                classeStatus="avaliacao";
                classeIcone="amarelo";
                icone="?";
            break;

            case "Concluída":
                classeStatus="concluida";
                classeIcone="verde";
                icone="✓";
            break;

            default:
                classeStatus="arquivada";
                classeIcone="roxo";
                icone="✕";
        }

        html += `

        <div class="card">

            <div class="esquerda">

                <div class="icone ${classeIcone}">
                    ${icone}
                </div>

                <div class="info">

                    <h2>${denuncia.titulo}</h2>

                    <p>${denuncia.descricao}</p>

                    <p><strong>Tipo:</strong> ${denuncia.tipo}</p>

                    <p><strong>Data:</strong> ${denuncia.data}</p>

                    <p><strong>Responsável:</strong> ${denuncia.responsavel}</p>

                </div>

            </div>

            <div class="direita">

                <span class="status ${classeStatus}">
                    ${denuncia.status}
                </span>

                <p class="protocolo">

                    ${denuncia.protocolo}

                </p>

                <button class="btn-detalhes">
                    Ver detalhes
                </button>

            </div>

        </div>

        `;

    });

    lista.innerHTML = html;

});

document.addEventListener("click",(e)=>{

    if(e.target.classList.contains("btn-detalhes")){

        alert("Esta denúncia está registrada e pode ser acompanhada pelo protocolo.");

    }

});