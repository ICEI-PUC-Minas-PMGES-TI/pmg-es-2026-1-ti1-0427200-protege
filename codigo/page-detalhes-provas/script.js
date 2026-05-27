const lista =
document.querySelector("#listaProvas");

async function carregarProvas(){

    const resposta =
    await fetch(
        "http://localhost:3000/provas"
    );

    
    }
