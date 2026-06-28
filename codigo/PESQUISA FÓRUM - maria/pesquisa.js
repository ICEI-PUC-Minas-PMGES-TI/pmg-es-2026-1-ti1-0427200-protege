let posts = [];

async function carregarPosts(){

    const resposta = await fetch("http://localhost:3000/posts");

    posts = await resposta.json();

    mostrarPosts(posts);

}

carregarPosts();


function mostrarPosts(listaPosts){

  let areaPosts = document.getElementById("area-posts");

  areaPosts.innerHTML = "";


  listaPosts.forEach((post) => {

    areaPosts.innerHTML += `

      <div class="card">

        <span class="categoria">
          ${post.categoria}
        </span>

        <h3>
          ${post.titulo}
        </h3>

        <p>
          ${post.descricao}
        </p>

        <div class="info">
          ${post.respostas || 0} respostas
        </div>

        <button
          class="ver-mais"
          onclick="abrirPost(${post.id})">
          Ver discussão
        </button>

      </div>

    `;

  });

}

function pesquisarPosts(){

  let valorPesquisa = document
    .getElementById("pesquisa")
    .value
    .toLowerCase();


  let filtrados = posts.filter((post) =>

    post.titulo
      .toLowerCase()
      .includes(valorPesquisa)

  );


  mostrarPosts(filtrados);

}

function filtrarCategoria(categoria){

  if(categoria == "Todas"){

    mostrarPosts(posts);

    return;

  }


  let filtrados = posts.filter((post) =>

    post.categoria == categoria

  );


  mostrarPosts(filtrados);

}

function abrirPost(id){

    window.location.href =
    `post.html?id=${id}`;

}