const lista =
document.querySelector("#listaProvas");

async function carregarProvas(){

    const resposta =
    await fetch(
        "http://localhost:3000/provas"
    );
const provas =
    await resposta.json();

    lista.innerHTML = "";

    provas.forEach((prova) => {

        let preview = "";

        if(
            prova.arquivoTipo === "imagem"
        ){

            preview = `
                <img
                    src="${prova.arquivo}"
                    class="preview-img"
                >
            `;
        }

        else if(
            prova.arquivoTipo === "video"
        ){

            preview = `
                <video
                    controls
                    class="preview-video"
                >
                    <source
                        src="${prova.arquivo}"
                    >
                </video>
            `;
        }

        else if(
            prova.arquivoTipo === "audio"
        ){

            preview = `
                <audio
                    controls
                    class="audio-player"
                >
                    <source
                        src="${prova.arquivo}"
                    >
                </audio>
            `;
        }

        else{

            preview = `
                <iframe
                    src="${prova.arquivo}"
                    class="preview-pdf"
                >
                </iframe>
            `;
        }
    
    }
}