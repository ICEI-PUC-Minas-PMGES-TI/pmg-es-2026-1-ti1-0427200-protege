const violencias = [
  {
    tipo: "Violência Psicológica",
    descricao:
      "Ameaças, humilhações, xingamentos, manipulação, isolamento, controle excessivo e desvalorização."
  },

  {
    tipo: "Violência Física",
    descricao:
      "Agressões, tapas, empurrões, chutes, queimaduras, uso de armas ou qualquer ato que fira o corpo."
  },

  {
    tipo: "Violência Patrimonial",
    descricao:
      "Controle do dinheiro, destruição de objetos pessoais, proibição de trabalhar ou estudar."
  },

  {
    tipo: "Violência Moral",
    descricao:
      "Ofensas, calúnias, difamações, exposição e críticas constantes que ferem a autoestima."
  },

  {
    tipo: "Violência Sexual",
    descricao:
      "Qualquer ato sexual forçado, sem consentimento, intimidação ou que cause desconforto."
  }
];

const container = document.getElementById("cards-container");

violencias.forEach(item => {

  container.innerHTML += `
  
    <div class="card">

      <div class="card-top">
        <h2>${item.tipo}</h2>
      </div>

      <div class="card-content">
        <p>${item.descricao}</p>

        <button class="btn">
          Saiba mais
        </button>
      </div>

    </div>
  
  `;
});