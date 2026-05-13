let arquivos = [];

function escolherArquivo(tipo) {
  document.getElementById("seletor-arquivo").click();
}

function arquivoSelecionado(input) {
  let arquivo = input.files[0];

  if (arquivo) {
    arquivos.push(arquivo.name);
    atualizarLista();
  }
}

function atualizarLista() {
  let lista = document.getElementById("lista-arquivos");
  let contador = document.getElementById("contador");
  let botao = document.getElementById("btn-relatorio");

  lista.innerHTML = "";

  arquivos.forEach((nome) => {
    lista.innerHTML += `<p>${nome}</p>`;
  });

  contador.innerText = arquivos.length + " arquivos";
  botao.disabled = arquivos.length === 0;
}

function irParaConfirmacao() {
  document.getElementById("tela-principal").classList.remove("ativa");
  document.getElementById("lista-confirmacao").classList.add("ativa");

  let confirmacao = document.getElementById("lista-confirmacao-itens");
  confirmacao.innerHTML = arquivos.map((a) => `<p>${a}</p>`).join("");
}
