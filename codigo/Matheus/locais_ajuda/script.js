var API_URL = "http://localhost:3001";

function getChecked(grupo) {
  return [
    ...document.querySelectorAll(
      `.filtro-grupo:nth-of-type(${grupo}) input:checked`,
    ),
  ].map((cb) => cb.value);
}

function exibirResultados(lista) {
  const publicoSelecionado = getChecked(1);
  const tipoSelecionado = getChecked(2);

  let resultados = lista.filter((item) => {
    const passaPublico =
      publicoSelecionado.length === 0 ||
      publicoSelecionado.some((p) => item.publico.includes(p));

    const passaTipo =
      tipoSelecionado.length === 0 || tipoSelecionado.includes(item.tipo);

    return passaPublico && passaTipo;
  });

  const divTela = document.getElementById("tela");

  if (resultados.length === 0) {
    divTela.innerHTML =
      "<p class='sem-resultado'>Nenhum local encontrado para os filtros selecionados.</p>";
    return;
  }

  divTela.innerHTML = resultados
    .map(
      (item) => `
    <div class="card-local">
      <span class="card-tipo">${item.tipo}</span>
      <strong>${item.nome}</strong>
      <p>${item.endereco}</p>
    </div>
  `,
    )
    .join("");
}

// Busca os locais da API e aplica filtros no cliente
function carregarLocais() {
  fetch(API_URL + "/locais")
    .then((res) => res.json())
    .then((lista) => {
      // Guarda a lista e re-filtra sempre que um checkbox muda
      window._locaisCache = lista;
      exibirResultados(lista);

      document.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
        cb.addEventListener("change", () =>
          exibirResultados(window._locaisCache),
        );
      });
    })
    .catch((err) => {
      console.error("Erro ao buscar locais:", err);
      document.getElementById("tela").innerHTML =
        "<p class='sem-resultado'>Erro ao carregar os locais. Verifique se o servidor está rodando.</p>";
    });
}

carregarLocais();
