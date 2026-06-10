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
  },

  {
    id: 4,
    titulo: "Quero denunciar mas tenho medo",
    descricao: "Tenho provas contra meu companheiro, mas estou com medo das consequências da denúncia.",
    categoria: "Denúncia",
    respostas: 14
  },

  {
    id: 5,
    titulo: "Minha família não acredita em mim",
    descricao: "Contei sobre as agressões que sofro, mas minha família acha que estou exagerando.",
    categoria: "Denúncia",
    respostas: 9
  },

  {
    id: 6,
    titulo: "Estou sendo ameaçada pelo meu ex",
    descricao: "Depois do término, meu ex começou a mandar mensagens agressivas e aparecer perto da minha casa.",
    categoria: "Ameaça",
    respostas: 11
  },
  
  {
    id: 7,
    titulo: "Não consigo sair desse relacionamento",
    descricao: "Mesmo sabendo que estou em um relacionamento abusivo, tenho medo de terminar e ficar sozinha.",
    categoria: "Relacionamento abusivo",
    respostas: 16
  },

  {
    id: 8,
    titulo: "Estou emocionalmente esgotada",
    descricao: "As situações que venho passando estão afetando minha saúde mental e preciso de apoio psicológico.",
    categoria: "Ajuda psicológica",
    respostas: 7
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

mostrarPosts(posts);

function abrirPost(id){

    window.location.href =
    `post.html?id=${id}`;

}