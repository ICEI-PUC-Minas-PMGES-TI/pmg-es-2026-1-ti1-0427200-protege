// funcao pra marcar sim ou nao
  function marcar(opcao) {
    document.getElementById('sim').classList.remove('marcado')
    document.getElementById('nao').classList.remove('marcado')
    document.getElementById(opcao).classList.add('marcado')
  }
 
  // funcao pra enviar mensagem
  function enviar() {
    var texto = document.getElementById('campo').value
    if (texto == '') return
 
    var p = document.createElement('p')
    p.className = 'mensagem'
    p.style.background = '#a07ee0'
    p.style.alignSelf = 'flex-end'
    p.style.borderBottomLeftRadius = '16px'
    p.style.borderBottomRightRadius = '4px'
    p.textContent = texto
    document.querySelector('main').appendChild(p)
 
    document.getElementById('campo').value = ''
  }
 
  // enviar com enter
  document.getElementById('campo').addEventListener('keydown', function(e) {
    if (e.key == 'Enter') enviar()
  })