const perguntas = [

  {
    pergunta: "Clicando no botão “SOS”, o que acontece?",
    resposta: "Clicando no botão de “SOS”, você vai para página de denúncia rápida. Lá você escreve um pouco do que está passando e clica no botão “Enviar” caso deseje realizar a denúncia. Com isso, seu relato irá chegar na polícia onde será tomadas as devidas providências."
  },

  {
    pergunta: "Onde vejo um lugar para buscar ajuda perto de onde eu estou?",
    resposta: "Clicando em “Localização”, você irá ser direcionado para uma página onde consegue selecionar pontos de apoio próximos a você e que deseja visualizar, sejam eles Policiais, Hospitais ou ONG’s."
  },

  {
    pergunta: "Onde envio ou guardo minhas provas contra o abusador?",
    resposta: "Clicando no “Armazenar Provas”, lá você consegue inserir áudios, vídeos e fotos. Mesmo após fechar o site, as provas ficam guardadas e armazenadas em nosso banco e enviadas para polícia quando forem solicitadas."
  }

];

const cardsContainer = document.querySelector(".cards");

perguntas.forEach(item => {

  cardsContainer.innerHTML += `

    <div class="card">

      <div class="pergunta"> ${item.pergunta}</div>
      <div class="resposta"> ${item.resposta} </div>

    </div>

  `;

});

const campoPergunta = document.getElementById("campoPergunta");
const btnEnviar = document.getElementById("btnEnviar");

btnEnviar.addEventListener("click", () => {

  if(campoPergunta.value.trim() === ""){
    alert("Digite uma dúvida.");
    return;
  }

  alert("Sua dúvida foi enviada!");

  campoPergunta.value = "";
});