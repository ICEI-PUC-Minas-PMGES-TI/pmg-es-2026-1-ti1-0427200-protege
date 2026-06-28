const API = "http://localhost:3001";

let posts = [];

async function carregarPosts() {
  const resposta = await fetch(`${API}/posts`);
  posts = await resposta.json();
  mostrarPosts(posts);
}

function mostrarPosts(lista = posts) {
  let areaPosts = document.getElementById("lista-posts");
  areaPosts.innerHTML = "";

  lista.forEach((post) => {
    areaPosts.innerHTML += `
      <div class="post">
        <span class="categoria">${post.categoria}</span>
        <h3>${post.titulo}</h3>
        <p>${post.descricao}</p>
        <div class="info">
          ${post.anonimo ? "Publicado anonimamente" : "Usuário identificado"}
        </div>
        <div class="acoes">
          <button class="editar" onclick="editarPost('${post.id}')">Editar</button>
          <button class="excluir" onclick="excluirPost('${post.id}')">Excluir</button>
        </div>
      </div>
    `;
  });
}

async function criarPost() {
  let titulo = document.getElementById("titulo").value;
  let descricao = document.getElementById("descricao").value;
  let categoria = document.getElementById("categoria").value;
  let anonimo = document.getElementById("anonimo").checked;

  if (titulo == "" || descricao == "" || categoria == "") {
    alert("Preencha todos os campos.");
    return;
  }

  let novoPost = {
    titulo: titulo,
    descricao: descricao,
    categoria: categoria,
    anonimo: anonimo,
    respostas: 0
  };

  await fetch(`${API}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novoPost)
  });

  document.getElementById("titulo").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("categoria").value = "";
  document.getElementById("anonimo").checked = false;

  await carregarPosts();
}

async function excluirPost(id) {
  await fetch(`${API}/posts/${id}`, {
    method: "DELETE"
  });

  await carregarPosts();
}

async function editarPost(id) {
  let post = posts.find((p) => p.id == id);

  let novoTitulo = prompt("Editar título:", post.titulo);
  let novaDescricao = prompt("Editar descrição:", post.descricao);

  if (novoTitulo != null && novaDescricao != null) {
    await fetch(`${API}/posts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: novoTitulo,
        descricao: novaDescricao
      })
    });

    await carregarPosts();
  }
}

function pesquisarPost() {
  let valorPesquisa = document.getElementById("pesquisa").value.toLowerCase();

  let filtrados = posts.filter((post) =>
    post.titulo.toLowerCase().includes(valorPesquisa)
  );

  mostrarPosts(filtrados);
}

carregarPosts();