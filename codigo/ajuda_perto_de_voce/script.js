let local = ""

function buscador() {
    local = document.getElementById('campo-busca').value
}

var elem = document.getElementById('btn-busca')
elem.addEventListener('click', function () {
    buscador()
    var divTela = document.getElementById('tela')
    divTela.innerHTML = local
}, false)