// ===========================
// DADOS DAS DENÚNCIAS
// (baseado na estrutura JSON do projeto)
// ===========================

var denuncias = [
  { id: "den_001", data: "25/04/2026", bairro: "Braúnas",      tipo: "ameaca",      status: "pendente"  },
  { id: "den_002", data: "25/04/2026", bairro: "Ouro Preto",   tipo: "fisica",      status: "resolvido" },
  { id: "den_003", data: "26/04/2026", bairro: "Contagem",     tipo: "psicologica", status: "andamento" },
  { id: "den_004", data: "26/04/2026", bairro: "Barreiro",     tipo: "assedio",     status: "resolvido" },
  { id: "den_005", data: "27/04/2026", bairro: "Venda Nova",   tipo: "ameaca",      status: "pendente"  },
  { id: "den_006", data: "27/04/2026", bairro: "Centro",       tipo: "fisica",      status: "andamento" },
  { id: "den_007", data: "28/04/2026", bairro: "Braúnas",      tipo: "psicologica", status: "resolvido" },
  { id: "den_008", data: "28/04/2026", bairro: "Ouro Preto",   tipo: "assedio",     status: "pendente"  },
  { id: "den_009", data: "29/04/2026", bairro: "Contagem",     tipo: "ameaca",      status: "resolvido" },
  { id: "den_010", data: "29/04/2026", bairro: "Barreiro",     tipo: "fisica",      status: "andamento" },
  { id: "den_011", data: "01/05/2026", bairro: "Venda Nova",   tipo: "psicologica", status: "resolvido" },
  { id: "den_012", data: "02/05/2026", bairro: "Centro",       tipo: "ameaca",      status: "pendente"  },
  { id: "den_013", data: "03/05/2026", bairro: "Braúnas",      tipo: "assedio",     status: "resolvido" },
  { id: "den_014", data: "05/05/2026", bairro: "Ouro Preto",   tipo: "fisica",      status: "andamento" },
  { id: "den_015", data: "07/05/2026", bairro: "Contagem",     tipo: "ameaca",      status: "pendente"  },
];

// ===========================
// GUARDAR REFERÊNCIA DOS GRÁFICOS
// (para poder destruir antes de recriar)
// ===========================

var graficoMeses   = null;
var graficoTipos   = null;
var graficoStatus  = null;
var graficoBairros = null;

// ===========================
// FUNÇÃO: FILTRAR OS DADOS
// ===========================

function filtrarDados() {
  var tipo   = document.getElementById("filtroTipo").value;
  var status = document.getElementById("filtroStatus").value;

  var resultado = [];

  for (var i = 0; i < denuncias.length; i++) {
    var d = denuncias[i];

    var passaTipo   = (tipo   === "todos" || d.tipo   === tipo);
    var passaStatus = (status === "todos" || d.status === status);

    if (passaTipo && passaStatus) {
      resultado.push(d);
    }
  }

  return resultado;
}

// ===========================
// FUNÇÃO: CONTAR OCORRÊNCIAS
// ===========================

function contarPorCampo(lista, campo) {
  var contagem = {};

  for (var i = 0; i < lista.length; i++) {
    var valor = lista[i][campo];
    if (contagem[valor] === undefined) {
      contagem[valor] = 0;
    }
    contagem[valor]++;
  }

  return contagem;
}

// ===========================
// FUNÇÃO: ATUALIZAR OS CARDS
// ===========================

function atualizarCards(lista) {
  var pendentes  = 0;
  var resolvidos = 0;

  for (var i = 0; i < lista.length; i++) {
    if (lista[i].status === "pendente")  pendentes++;
    if (lista[i].status === "resolvido") resolvidos++;
  }

  document.getElementById("totalDenuncias").textContent = lista.length;
  document.getElementById("totalPendentes").textContent = pendentes;
  document.getElementById("totalResolvidos").textContent = resolvidos;
}

// ===========================
// FUNÇÃO: MONTAR A TABELA
// ===========================

function atualizarTabela(lista) {
  var corpo = document.getElementById("corpoTabela");
  corpo.innerHTML = "";

  if (lista.length === 0) {
    corpo.innerHTML = "<tr><td colspan='5' style='text-align:center; color:#999; padding:20px;'>Nenhum resultado encontrado.</td></tr>";
    return;
  }

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

  for (var i = 0; i < lista.length; i++) {
    var d = lista[i];

    var linha = "<tr>";
    linha += "<td>" + d.id + "</td>";
    linha += "<td>" + d.data + "</td>";
    linha += "<td>" + d.bairro + "</td>";
    linha += "<td><span class='tag tag-" + d.tipo + "'>" + nomesTipo[d.tipo] + "</span></td>";
    linha += "<td><span class='status status-" + d.status + "'>" + nomesStatus[d.status] + "</span></td>";
    linha += "</tr>";

    corpo.innerHTML += linha;
  }
}

// ===========================
// FUNÇÃO: MONTAR OS GRÁFICOS
// ===========================

function atualizarGraficos(lista) {

  // --- Gráfico de barras: denúncias por mês ---
  var meses = ["Jan", "Fev", "Mar", "Abr", "Mai"];
  var qtdPorMes = [12, 19, 22, 28, lista.length]; // os últimos são variáveis

  if (graficoMeses !== null) {
    graficoMeses.destroy();
  }

  var ctxMeses = document.getElementById("graficoMeses").getContext("2d");
  graficoMeses = new Chart(ctxMeses, {
    type: "bar",
    data: {
      labels: meses,
      datasets: [{
        label: "Denúncias",
        data: qtdPorMes,
        backgroundColor: "#5a2d82",
        borderRadius: 5
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  // --- Gráfico de rosca: tipos de violência ---
  var contagemTipos = contarPorCampo(lista, "tipo");

  var nomesTipo  = ["ameaca", "fisica", "psicologica", "assedio"];
  var labelsTipo = ["Ameaça", "Física", "Psicológica", "Assédio"];
  var dadosTipo  = [];
  for (var i = 0; i < nomesTipo.length; i++) {
    dadosTipo.push(contagemTipos[nomesTipo[i]] || 0);
  }

  if (graficoTipos !== null) {
    graficoTipos.destroy();
  }

  var ctxTipos = document.getElementById("graficoTipos").getContext("2d");
  graficoTipos = new Chart(ctxTipos, {
    type: "doughnut",
    data: {
      labels: labelsTipo,
      datasets: [{
        data: dadosTipo,
        backgroundColor: ["#e74c3c", "#f39c12", "#5a2d82", "#27ae60"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" }
      }
    }
  });

  // --- Gráfico de rosca: status dos casos ---
  var contagemStatus = contarPorCampo(lista, "status");

  var nomesStatus  = ["pendente", "andamento", "resolvido"];
  var labelsStatus = ["Pendente", "Em Andamento", "Resolvido"];
  var dadosStatus  = [];
  for (var i = 0; i < nomesStatus.length; i++) {
    dadosStatus.push(contagemStatus[nomesStatus[i]] || 0);
  }

  if (graficoStatus !== null) {
    graficoStatus.destroy();
  }

  var ctxStatus = document.getElementById("graficoStatus").getContext("2d");
  graficoStatus = new Chart(ctxStatus, {
    type: "doughnut",
    data: {
      labels: labelsStatus,
      datasets: [{
        data: dadosStatus,
        backgroundColor: ["#f39c12", "#5a2d82", "#27ae60"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" }
      }
    }
  });

  // --- Gráfico de barras: denúncias por bairro ---
  var contagemBairros = contarPorCampo(lista, "bairro");

  var bairros      = Object.keys(contagemBairros);
  var qtdBairros   = Object.values(contagemBairros);

  if (graficoBairros !== null) {
    graficoBairros.destroy();
  }

  var ctxBairros = document.getElementById("graficoBairros").getContext("2d");
  graficoBairros = new Chart(ctxBairros, {
    type: "bar",
    data: {
      labels: bairros,
      datasets: [{
        label: "Denúncias",
        data: qtdBairros,
        backgroundColor: "#9b59b6",
        borderRadius: 5
      }]
    },
    options: {
      indexAxis: "y",
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { beginAtZero: true }
      }
    }
  });
}

// ===========================
// FUNÇÃO: APLICAR FILTROS
// (chamada pelo botão Filtrar)
// ===========================

function aplicarFiltros() {
  var lista = filtrarDados();
  atualizarCards(lista);
  atualizarTabela(lista);
  atualizarGraficos(lista);
}

// ===========================
// FUNÇÃO: LIMPAR FILTROS
// ===========================

function limparFiltros() {
  document.getElementById("filtroTipo").value   = "todos";
  document.getElementById("filtroStatus").value = "todos";
  document.getElementById("filtroPeriodo").value = "todos";

  aplicarFiltros();
}

// ===========================
// INICIALIZAR A PÁGINA
// ===========================

aplicarFiltros();