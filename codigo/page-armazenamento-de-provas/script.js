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
    }
)

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

}