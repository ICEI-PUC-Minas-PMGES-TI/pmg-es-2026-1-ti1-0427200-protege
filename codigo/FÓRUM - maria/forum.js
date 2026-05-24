// JSON
let posts = JSON.parse(localStorage.getItem("posts")) || [

  {
    id: 1,
    titulo: "Tenho medo de denunciar meu parceiro",
    descricao: "Ele ameaça pegar meu celular e fala que ninguém vai acreditar em mim.",
    categoria: "Relacionamento abusivo",
    anonimo: true
  },

  {
    id: 2,
    titulo: "Estou recebendo ameaças",
    descricao: "Meu ex está me perseguindo pelas redes sociais e mandando mensagens.",
    categoria: "Ameaça",
    anonimo: true
  }

];


function mostrarPosts(lista = posts){

  let areaPosts = document.getElementById("lista-posts");

  areaPosts.innerHTML = "";

  lista.forEach((post) => {

    areaPosts.innerHTML += `

      <div class="post">

        <span class="categoria">
          ${post.categoria}
        </span>

        <h3>${post.titulo}</h3>

        <p>${post.descricao}</p>

        <div class="info">
          ${post.anonimo ? "Publicado anonimamente" : "Usuário identificado"}
        </div>

        <div class="acoes">

          <button 
            class="editar"
            onclick="editarPost(${post.id})"
          >
            Editar
          </button>

          <button 
            class="excluir"
            onclick="excluirPost(${post.id})"
          >
            Excluir
          </button>

        </div>

      </div>

    `;

  });

}


function criarPost(){

  let titulo = document.getElementById("titulo").value;

  let descricao = document.getElementById("descricao").value;

  let categoria = document.getElementById("categoria").value;

  let anonimo = document.getElementById("anonimo").checked;


  if(
    titulo == "" ||
    descricao == "" ||
    categoria == ""
  ){
    alert("Preencha todos os campos.");
    return;
  }


  let novoPost = {

    id: Date.now(),

    titulo: titulo,

    descricao: descricao,

    categoria: categoria,

    anonimo: anonimo

  };


  posts.push(novoPost);

  salvarLocalStorage();

  mostrarPosts();


  document.getElementById("titulo").value = "";

  document.getElementById("descricao").value = "";

  document.getElementById("categoria").value = "";

  document.getElementById("anonimo").checked = false;

}


function excluirPost(id){

  posts = posts.filter((post) => post.id != id);

  salvarLocalStorage();

  mostrarPosts();

}



function editarPost(id){

  let post = posts.find((p) => p.id == id);

  let novoTitulo = prompt(
    "Editar título:",
    post.titulo
  );

  let novaDescricao = prompt(
    "Editar descrição:",
    post.descricao
  );

  if(
    novoTitulo != null &&
    novaDescricao != null
  ){

    post.titulo = novoTitulo;

    post.descricao = novaDescricao;

    salvarLocalStorage();

    mostrarPosts();

  }

}

function pesquisarPost(){

  let valorPesquisa =
    document.getElementById("pesquisa")
    .value
    .toLowerCase();


  let filtrados = posts.filter((post) =>

    post.titulo
    .toLowerCase()
    .includes(valorPesquisa)

  );

  mostrarPosts(filtrados);

}

function salvarLocalStorage(){

  localStorage.setItem(
    "posts",
    JSON.stringify(posts)
  );

}

mostrarPosts();