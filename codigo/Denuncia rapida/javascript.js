const mensagem = document.getElementById("mensagem");

document.getElementById("cancelar").addEventListener("click", () => {

    if(confirm("Cancelar denúncia?")){
        mensagem.value = "";
    }

});


document.getElementById("enviar").addEventListener("click", () => {

    if(mensagem.value.trim()==""){
        alert("Descreva o ocorrido.");
        return;
    }

    const denuncia={

        titulo:"Denúncia SOS",

        descricao:mensagem.value,

        tipo:"SOS",

        data:new Date().toLocaleDateString("pt-BR"),

        responsavel:"Equipe de Apoio",

        status:"Em avaliação",

        protocolo:"DEN-"+Date.now()

    };

    fetch("http://localhost:3000/denuncias",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(denuncia)

    })
    .then(()=>{

        alert("Denúncia enviada com sucesso!");

        window.location.href="../minhas-denuncias/index.html";

    })
    .catch(()=>{

        alert("Erro ao enviar denúncia.");

    });

});