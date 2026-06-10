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
            "Ele me ameaça constantemente e tenho medo das consequências caso eu denuncie."
    },

    {
        id: "2",
        categoria: "Ameaça",
        titulo: "Estou recebendo ameaças",
        descricao:
            "Meu ex está me perseguindo pelas redes sociais e enviando mensagens agressivas."
    },

    {
        id: "3",
        categoria: "Ajuda psicológica",
        titulo: "Preciso de ajuda psicológica",
        descricao:
            "Estou emocionalmente esgotada e preciso de orientação."
    }

];

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

            <h1>
                ${post.titulo}
            </h1>

            <p>
                ${post.descricao}
            </p>

        </div>

    `;
}