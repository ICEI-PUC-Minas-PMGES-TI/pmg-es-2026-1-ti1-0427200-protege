var denuncias = [
  { id: "den_001", data: "25/04/2026", bairro: "Braúnas",    tipo: "ameaca",     status: "pendente"  },
  { id: "den_002", data: "25/04/2026", bairro: "Ouro Preto", tipo: "fisica",      status: "resolvido" },
  { id: "den_003", data: "26/04/2026", bairro: "Contagem",   tipo: "psicologica", status: "andamento" },
  { id: "den_004", data: "26/04/2026", bairro: "Barreiro",   tipo: "assedio",     status: "resolvido" },
  { id: "den_005", data: "27/04/2026", bairro: "Venda Nova", tipo: "ameaca",     status: "pendente"  },
  { id: "den_006", data: "27/04/2026", bairro: "Centro",     tipo: "fisica",      status: "andamento" },
  { id: "den_007", data: "28/04/2026", bairro: "Braúnas",    tipo: "psicologica", status: "resolvido" },
  { id: "den_008", data: "29/04/2026", bairro: "Contagem",   tipo: "ameaca",     status: "resolvido" }
];

var nomesTipo = {
  ameaca:      "Ameaça",
  fisica:      "Física",
  psicologica: "Psicológica",
  assedio:     "Assédio"
};

var nomesStatus = {
  pendente:  "Pendente",
  andamento: "Em Andamento",
  resolvido: "Resolvido"
};

function filtrarDenuncias() {
  var periodo = document.getElementById("filtroPeriodo").value;
  var tipo    = document.getElementById("filtroTipo").value;
  var status  = document.getElementById("filtroStatus").value;

  var resultado = [];

  for (var i = 0; i < denuncias.length; i++) {
    var d = denuncias[i];

    if (tipo !== "todos" && d.tipo !== tipo) {
      continue;
    }

    if (status !== "todos" && d.status !== status) {
      continue;
    }

    resultado.push(d);
  }

  return resultado;
}

function atualizarCards(lista) {
  var total     = lista.length;
  var pendentes = 0;
  var resolvidos = 0;

  for (var i = 0; i < lista.length; i++) {
    if (lista[i].status === "pendente") {
      pendentes++;
    }
    if (lista[i].status === "resolvido") {
      resolvidos++;
    }
  }

  document.querySelector(".card.vermelho .card-numero").textContent = total;
  document.querySelector(".card.roxo .card-numero").textContent     = pendentes;
  document.querySelector(".card.verde .card-numero").textContent    = resolvidos;
}

function atualizarTabela(lista) {
  var tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  if (lista.length === 0) {
    var linha = document.createElement("tr");
    var celula = document.createElement("td");
    celula.colSpan = 5;
    celula.textContent = "Nenhuma denúncia encontrada.";
    celula.style.textAlign = "center";
    celula.style.color = "#999";
    linha.appendChild(celula);
    tbody.appendChild(linha);
    return;
  }

  for (var i = 0; i < lista.length; i++) {
    var d = lista[i];

    var linha = document.createElement("tr");

    var tdId     = document.createElement("td");
    var tdData   = document.createElement("td");
    var tdBairro = document.createElement("td");
    var tdTipo   = document.createElement("td");
    var tdStatus = document.createElement("td");

    tdId.textContent     = d.id;
    tdData.textContent   = d.data;
    tdBairro.textContent = d.bairro;

    var spanTipo = document.createElement("span");
    spanTipo.className   = "tag tag-" + d.tipo;
    spanTipo.textContent = nomesTipo[d.tipo];
    tdTipo.appendChild(spanTipo);

    var spanStatus = document.createElement("span");
    spanStatus.className   = "status status-" + d.status;
    spanStatus.textContent = nomesStatus[d.status];
    tdStatus.appendChild(spanStatus);

    linha.appendChild(tdId);
    linha.appendChild(tdData);
    linha.appendChild(tdBairro);
    linha.appendChild(tdTipo);
    linha.appendChild(tdStatus);

    tbody.appendChild(linha);
  }
}