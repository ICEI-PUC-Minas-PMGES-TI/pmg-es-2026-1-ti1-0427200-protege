let posts = JSON.parse(localStorage.getItem("posts")) || [

  {
    id: 1,
    titulo: "Tenho medo de denunciar meu parceiro",
    descricao: "Ele ameaça pegar meu celular e diz que ninguém vai acreditar em mim.",
    categoria: "Relacionamento abusivo",
    respostas: 12
  },

  {
    id: 2,
    titulo: "Estou recebendo ameaças",
    descricao: "Meu ex está me perseguindo pelas redes sociais e mandando mensagens.",
    categoria: "Ameaça",
    respostas: 8
  },

  {
    id: 3,
    titulo: "Preciso de ajuda psicológica",
    descricao: "Estou me sentindo muito pressionada emocionalmente e não sei o que fazer.",
    categoria: "Ajuda psicológica",
    respostas: 5
  }

];

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

        <button class="ver-mais">
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

mostrarPosts(posts);