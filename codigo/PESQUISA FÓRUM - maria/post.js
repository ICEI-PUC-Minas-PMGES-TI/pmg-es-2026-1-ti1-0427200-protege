const parametros = new URLSearchParams(
    window.location.search
);

const id = parametros.get("id");

const posts = [

    {
        id: "1",
        categoria: "Denúncia",
        titulo: "Tenho medo de denunciar meu parceiro",
        descricao:
            "Ele me ameaça constantemente e tenho medo das consequências caso eu denuncie.",
        respostas: 12
    },

    {
        id: "2",
        categoria: "Ameaça",
        titulo: "Estou recebendo ameaças",
        descricao:
            "Meu ex está me perseguindo pelas redes sociais e enviando mensagens agressivas.",
        respostas: 8
    },

    {
        id: "3",
        categoria: "Ajuda psicológica",
        titulo: "Preciso de ajuda psicológica",
        descricao:
            "Estou emocionalmente esgotada e preciso de orientação.",
        respostas: 5
    },

    {
        id: "4",
        categoria: "Denúncia",
        titulo: "Quero denunciar mas tenho medo",
        descricao:
        "Tenho provas contra meu companheiro, mas estou com medo das consequências da denúncia.",
        respostas: 14
    },

    {
        id: "5",
        categoria: "Denúncia",
        titulo: "Minha família não acredita em mim",
        descricao:
        "Contei sobre as agressões que sofro, mas minha família acha que estou exagerando.",
        respostas: 9
    },

    {
        id: "6",
        categoria: "Ameaça",
        titulo: "Estou sendo ameaçada pelo meu ex",
        descricao:
        "Depois do término, meu ex começou a mandar mensagens agressivas e aparecer perto da minha casa.",
        respostas: 11
    },

    {
        id: "7",
        categoria: "Relacionamento abusivo",
        titulo: "Não consigo sair desse relacionamento",
        descricao:
        "Mesmo sabendo que estou em um relacionamento abusivo, tenho medo de terminar e ficar sozinha.",
        respostas: 16
    },

    {
        id: "8",
        categoria: "Ajuda psicológica",
        titulo: "Estou emocionalmente esgotada",
        descricao:
        "As situações que venho passando estão afetando minha saúde mental e preciso de apoio psicológico.",
        respostas: 7
    }

];

const comentarios = {

    1: [
        "Você não está sozinha. Procure ajuda especializada.",
        "Tente reunir provas e buscar apoio de pessoas de confiança."
    ],

    2: [
        "Guarde prints das mensagens.",
        "Considere registrar um boletim de ocorrência."
    ],

    3: [
        "Procure atendimento psicológico gratuito na sua região.",
        "Conversar com alguém de confiança pode ajudar."
    ]

};

const post = posts.find(
    p => p.id === id
);

if(post){

    document.getElementById(
        "post-container"
    ).innerHTML = `

        <div class="post">

            <span class="categoria">
                ${post.categoria}
            </span>

            <div class="info-post">
                <span> Anônimo</span>
                <span> 10/06/2026</span>
            </div>

            <h1>
                ${post.titulo}
            </h1>

            <p>
                ${post.descricao}
            </p>

            <div class="respostas-info">
                 ${post.respostas} respostas
            </div>

        </div>

    `;

    carregarComentarios();
}

function carregarComentarios(){

    const lista =
    document.getElementById(
        "lista-comentarios"
    );

    lista.innerHTML = "";

    if(comentarios[id]){

        comentarios[id].forEach(
            comentario => {

                lista.innerHTML += `

                    <div class="comentario">
                        ${comentario}
                    </div>

                `;

            }
        );

    }

}