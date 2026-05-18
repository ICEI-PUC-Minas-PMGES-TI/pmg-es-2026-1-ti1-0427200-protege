function enviar() {
    var texto = document.getElementById('campo').value
    if (texto == '') return
 
    var p = document.createElement('p')
    p.className = 'mensagem-usuario'
    p.textContent = texto
    document.getElementById('mensagens').appendChild(p)
 
    document.getElementById('campo').value = ''
  }
 
  document.getElementById('campo').addEventListener('keydown', function(e) {
    if (e.key == 'Enter') enviar()
  })

  