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

