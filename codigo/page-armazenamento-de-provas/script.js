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