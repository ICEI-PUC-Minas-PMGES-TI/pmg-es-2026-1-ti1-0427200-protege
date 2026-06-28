const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

async function carregarPost() {

    const resposta = await fetch("http://localhost:3000/posts");
    const posts = await resposta.json();

    const post = posts.find(p => p.id == id);

    if (!post) {
        document.getElementById("post-container").innerHTML =
            "<h2>Post não encontrado.</h2>";
        return;
    }

    document.getElementById("post-container").innerHTML = `

        <div class="post">

            <span class="categoria">
                ${post.categoria}
            </span>

            <div class="info-post">
                <span> Anônimo</span>
                <span> 10/06/2026</span>
            </div>

            <h1>${post.titulo}</h1>

            <p>${post.descricao}</p>

            <div class="respostas-info">
                 ${post.respostas} respostas
            </div>

        </div>

    `;

    carregarComentarios();
}

async function carregarComentarios() {

    const resposta = await fetch("http://localhost:3000/comentarios");

    const comentarios = await resposta.json();

    const lista = document.getElementById("lista-comentarios");

    lista.innerHTML = "";

    comentarios
        .filter(comentario => comentario.postId == id)
        .forEach(comentario => {

            lista.innerHTML += `

                <div class="comentario">
                    ${comentario.texto}
                </div>

            `;

        });

}

carregarPost();