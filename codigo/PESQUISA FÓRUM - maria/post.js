const parametros =
new URLSearchParams(
window.location.search
);

const id =
parametros.get("id");



async function carregarPost(){

    const resposta =
    await fetch(
    `http://localhost:3000/posts/${id}`
    );

    const post =
    await resposta.json();


    document
    .getElementById("post-container")
    .innerHTML = `

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



carregarPost();