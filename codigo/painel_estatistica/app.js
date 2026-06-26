var API_URL = 'http://localhost:3000';

var nomesTipo = {
  ameaca:      'Ameaça',
  fisica:      'Física',
  psicologica: 'Psicológica',
  assedio:     'Assédio'
};

var nomesStatus = {
  pendente:  'Pendente',
  andamento: 'Em Andamento',
  resolvido: 'Resolvido'
};

function atualizarCards(lista) {
  var total     = lista.length;
  var pendentes = 0;
  var resolvidos = 0;

  for (var i = 0; i < lista.length; i++) {
    if (lista[i].status === 'pendente')  pendentes++;
    if (lista[i].status === 'resolvido') resolvidos++;
  }

  document.querySelector('.card.vermelho .card-numero').textContent = total;
  document.querySelector('.card.roxo .card-numero').textContent     = pendentes;
  document.querySelector('.card.verde .card-numero').textContent    = resolvidos;
}

function atualizarTabela(lista) {
  var tbody = document.querySelector('tbody');
  tbody.innerHTML = '';

  if (lista.length === 0) {
    var linha  = document.createElement('tr');
    var celula = document.createElement('td');
    celula.colSpan    = 5;
    celula.textContent = 'Nenhuma denúncia encontrada.';
    celula.style.textAlign = 'center';
    celula.style.color     = '#999';
    linha.appendChild(celula);
    tbody.appendChild(linha);
    return;
  }

  for (var i = 0; i < lista.length; i++) {
    var d = lista[i];

    var linha    = document.createElement('tr');
    var tdId     = document.createElement('td');
    var tdData   = document.createElement('td');
    var tdBairro = document.createElement('td');
    var tdTipo   = document.createElement('td');
    var tdStatus = document.createElement('td');

    tdId.textContent     = d.id;
    tdData.textContent   = d.data;
    tdBairro.textContent = d.bairro;

    var spanTipo = document.createElement('span');
    spanTipo.className   = 'tag tag-' + d.tipo;
    spanTipo.textContent = nomesTipo[d.tipo];
    tdTipo.appendChild(spanTipo);

    var spanStatus = document.createElement('span');
    spanStatus.className   = 'status status-' + d.status;
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

function montarQueryString() {
  var tipo   = document.getElementById('filtroTipo').value;
  var status = document.getElementById('filtroStatus').value;

  var params = [];
  if (tipo   !== 'todos') params.push('tipo='   + tipo);
  if (status !== 'todos') params.push('status=' + status);

  return params.length > 0 ? '?' + params.join('&') : '';
}

function aplicarFiltros() {
  var query = montarQueryString();

  fetch(API_URL + '/denuncias' + query)
    .then(function(res) { return res.json(); })
    .then(function(lista) {
      atualizarCards(lista);
      atualizarTabela(lista);
    })
    .catch(function(err) {
      console.error('Erro ao buscar denúncias:', err);
    });
}

function limparFiltros() {
  document.getElementById('filtroPeriodo').value = 'todos';
  document.getElementById('filtroTipo').value    = 'todos';
  document.getElementById('filtroStatus').value  = 'todos';
  aplicarFiltros();
}

var botoes = document.querySelectorAll('button');
botoes[0].addEventListener('click', aplicarFiltros);
botoes[1].addEventListener('click', limparFiltros);

// Carrega os dados ao abrir a página
aplicarFiltros();
