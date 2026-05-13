const formulario =
document.querySelector("#arquivoForm");

window.onload = () => {

    listarArquivos();
};

formulario.addEventListener(
    "submit",
    async (e) => {

    e.preventDefault();

    const titulo =
    document.querySelector("#titulo").value;

    const tipo =
    document.querySelector("#tipo").value;

    const descricao =
    document.querySelector("#descricao").value;

    const arquivoInput =
    document.querySelector("#arquivoInput");

    const arquivoSelecionado =
    arquivoInput.files[0];

    if(!arquivoSelecionado){

        alert("Selecione um arquivo");

        return;
    }

    const leitor = new FileReader();

    leitor.onload = async function(evento){

        const arquivo = {

            titulo: titulo,

            tipo: tipo,

            descricao: descricao,

            arquivoNome:
            arquivoSelecionado.name,

            arquivoTipo:
            arquivoSelecionado.type,

            arquivoURL:
            evento.target.result
        };

        try{

            await fetch(
                "http://localhost:3000/arquivos",
                {
                    method:"POST",

                    headers:{
                        "Content-Type":
                        "application/json"
                    },

                    body:JSON.stringify(arquivo)
                }
            );

            alert("Arquivo salvo!");

            formulario.reset();

            listarArquivos();

        }catch(error){

            console.log(error);

            alert("Erro ao salvar");
        }
    };

    leitor.readAsDataURL(
        arquivoSelecionado
    );
});

async function listarArquivos(){

    const resposta =
    await fetch(
        "http://localhost:3000/arquivos"
    );

    const dados =
    await resposta.json();

    const lista =
    document.querySelector("#listaArquivos");

    lista.innerHTML = "";

    dados.forEach((item) => {

        let preview = "";

        if(
            item.arquivoTipo &&
            item.arquivoTipo.startsWith("image/")
        ){

            preview = `
                <img
                    src="${item.arquivoURL}"
                    class="preview-img"
                >
            `;

        }else if(
            item.arquivoTipo &&
            item.arquivoTipo.startsWith("video/")
        ){

            preview = `
                <video
                    controls
                    class="preview-video"
                >
                    <source
                        src="${item.arquivoURL}"
                    >
                </video>
            `;

        }else{

            preview = `
                <iframe
                    src="${item.arquivoURL}"
                    class="pdf-preview"
                >
                </iframe>
            `;
        }

        lista.innerHTML += `

        <div class="card">

            <h3>${item.titulo}</h3>

            <p>
                <strong>Tipo:</strong>
                ${item.tipo}
            </p>

            <p>
                ${item.descricao}
            </p>

            <p>
                <strong>Arquivo:</strong>
                ${item.arquivoNome}
            </p>

            ${preview}

            <button
                onclick="editarArquivo(${item.id})"
            >
                Editar
            </button>

            <button
                onclick="excluirArquivo(${item.id})"
            >
                Excluir
            </button>

        </div>
        `;
    });
}

async function excluirArquivo(id){

    await fetch(
        `http://localhost:3000/arquivos/${id}`,
        {
            method:"DELETE"
        }
    );

    listarArquivos();
}

async function editarArquivo(id){

    const novoTitulo =
    prompt("Novo título:");

    const novoTipo =
    prompt("Novo tipo:");

    const novaDescricao =
    prompt("Nova descrição:");

    const resposta =
    await fetch(
        `http://localhost:3000/arquivos/${id}`
    );

    const arquivoAtual =
    await resposta.json();

    const atualizado = {

        ...arquivoAtual,

        titulo: novoTitulo,

        tipo: novoTipo,

        descricao: novaDescricao
    };

    await fetch(
        `http://localhost:3000/arquivos/${id}`,
        {
            method:"PUT",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:JSON.stringify(atualizado)
        }
    );

    listarArquivos();
}

function logout(){

    alert("Logout realizado!");

    window.location.href = "index.html";
}