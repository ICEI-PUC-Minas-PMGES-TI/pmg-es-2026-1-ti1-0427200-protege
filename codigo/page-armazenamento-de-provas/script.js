const formulario = document.querySelector("#arquivoForm");
const botaoSalvar = document.querySelector("#botaoSalvar");
const mensagem = document.querySelector("#mensagem");

function formatarTamanho(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const titulo = document.querySelector("#titulo").value;
    const tipo = document.querySelector("#tipo").value;
    const categoria = document.querySelector("#categoria").value;
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

        const prova = {
            id: Date.now(),
            titulo,
            tipo,
            categoria,
            descricao,
            arquivo: arquivoSelecionado.name,
            arquivoURL: evento.target.result,
            tamanho: formatarTamanho(arquivoSelecionado.size),
            data: new Date().toLocaleDateString("pt-BR"),
            protocolo: "PRV-" + Date.now(),
            origem: "upload",
            status: "Concluída"
        };

        botaoSalvar.disabled = true;
        botaoSalvar.textContent = "Salvando...";

        try {

            await fetch("http://localhost:3001/provas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(prova)
            });

            formulario.reset();
            mensagem.textContent = "Prova enviada com sucesso!";
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
