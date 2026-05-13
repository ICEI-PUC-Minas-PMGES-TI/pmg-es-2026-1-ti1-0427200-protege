const mensagem = document.getElementById("mensagem");
const btnCancelar = document.getElementById("cancelar");
const btnEnviar = document.getElementById("enviar");

btnCancelar.addEventListener("click", function () {

  const confirmar = confirm("Deseja realmente cancelar a denúncia?");

  if (confirmar) {
    mensagem.value = "";
    alert("Denúncia cancelada.");
  }

});
btnEnviar.addEventListener("click", function () {

  const texto = mensagem.value.trim();

  if (texto === "") {
    alert("Digite uma denúncia antes de enviar.");
    return;
  }
alert("Denúncia enviada com sucesso!");

  console.log("Denúncia:", texto);

  mensagem.value = "";

});