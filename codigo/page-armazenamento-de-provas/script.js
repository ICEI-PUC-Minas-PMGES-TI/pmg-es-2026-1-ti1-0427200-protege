const formulario = document.querySelector("#arquivoForm");
const botaoSalvar = document.querySelector("#botaoSalvar");
const mensagem = document.querySelector("#mensagem");

formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const titulo = document.querySelector("#titulo").value;
    const tipo = document.querySelector("#tipo").value;
    const descricao = document.querySelector("#descricao").value;
    const arquivoInput = document.querySelector("#arquivoInput");
    const arquivoSelecionado = arquivoInput.files[0];

    if (!arquivoSelecionado) {
        mensagem.textContent = "Selecione um arquivo.";
        mensagem.className = "mensagem erro";
        return;
    }

    const leitor = new FileReader();

    leitor.onload = async function (evento) {

        const arquivo = {
            titulo: titulo,
            tipo: tipo,
            descricao: descricao,
            arquivoNome: arquivoSelecionado.name,
            arquivoTipo: arquivoSelecionado.type,
            arquivoURL: evento.target.result
        };

        botaoSalvar.disabled = true;
        botaoSalvar.textContent = "Salvando...";

        try {

            await fetch("http://localhost:3000/arquivos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(arquivo)
            });

            formulario.reset();
            mensagem.textContent = "Arquivo salvo com sucesso!";
            mensagem.className = "mensagem sucesso";

        } catch (error) {

            console.log(error);
            mensagem.textContent = "Erro ao salvar o arquivo.";
            mensagem.className = "mensagem erro";

        } finally {

            botaoSalvar.disabled = false;
            botaoSalvar.textContent = "Salvar Arquivo";
        }
    };

    leitor.readAsDataURL(arquivoSelecionado);
});