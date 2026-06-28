const mensagem = document.getElementById("mensagem");

document.getElementById("cancelar").addEventListener("click", () => {
    if (confirm("Cancelar denúncia?")) {
        mensagem.value = "";
    }
});

document.getElementById("enviar").addEventListener("click", async () => {

    if (mensagem.value.trim() === "") {
        alert("Descreva o ocorrido.");
        return;
    }

    const denuncia = {
        id: Date.now(),
        titulo: "Denúncia SOS",
        descricao: mensagem.value,
        tipo: "denuncia",
        categoria: "SOS",
        data: new Date().toLocaleDateString("pt-BR"),
        protocolo: "DEN-" + Date.now(),
        origem: "denuncia",
        status: "Em andamento"
    };

    try {

        await fetch("http://localhost:3001/provas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(denuncia)
        });

        alert("Denúncia enviada com sucesso!");
        window.location.href = "../minhas denuncias/index.html";

    } catch (error) {

        console.error(error);
        alert("Erro ao enviar denúncia.");
    }
});
