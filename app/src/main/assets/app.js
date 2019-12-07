new fullpage("#fullpage", {
  autoScrolling: true,
  allowScrolling: false,
  anchors: ["Inicio", "Play", "Sobre"]
});

const data = {
    times_futebol: [
      "Athletico Paranaense",
      "Atlético Mineiro",
      "Avaí",
      "Bahia",
      "Botafogo",
      "Ceará",
      "Chapecoense",
      "Corinthians",
      "Cruzeiro",
      "CSA",
      "Flamengo",
      "Fluminense",
      "Fortaleza",
      "Goiás",
      "Grêmio",
      "Internacional",
      "Palmeiras",
      "Santos",
      "São Paulo",
      "Vasco da Gama"
    ],
    animais: [
      "abelha",
      "abutre",
      "anta",
      "aranha",
      "canguru",
      "cavalo",
      "cisne",
      "coelho",
      "elefante",
      "furão",
      "lagartixa"
    ],
    profissoes: [
      "ator",
      "arquiteto",
      "taxista",
      "dentista",
      "motorista",
      "bombeiro",
      "advogado",
      "escritor",
      "jornalista",
      "jardineiro",
      "piloto"
    ]
  };

fullpage_api.setAllowScrolling(false); //Permite fazer rolagem da página Aceita um valor boleano
//fullpage_api.setRecordHistory(true); //Grava o histórico da navegação.

const palavra_sorteada = document.querySelector("#palavra");
let tema_sorteado = "";

const opcoes = document.getElementsByClassName("opcoes");
const navegacao = document.getElementsByClassName("btn");

for (let i = 0; i < opcoes.length; i++) {
  opcoes[i].addEventListener("click", function() {
    playGame(opcoes[i].getAttribute("id"));
  });
}

for (let i = 0; i < navegacao.length; i++) {
  navegacao[i].addEventListener("click", function() {
    moveToPage(navegacao[i].textContent);
  });
}

function playGame(tema) {
  fullpage_api.setAllowScrolling(true);

  switch (tema) {
    case "animais":
      tema_sorteado = sorteio(data.animais);
      break;
    case "profissoes":
      tema_sorteado = sorteio(data.profissoes);
      break;
    case "times":
      tema_sorteado = sorteio(data.times_futebol);
      break;
  }

  palavra_sorteada.innerText = tema_sorteado;
  moveToPage("Play")
  fullpage_api.setAllowScrolling(false);
}

//Algorítmo para realizar o sorteio
function sorteio(lista) {
  let randomico = Math.floor(Math.random() * lista.length); //gerando número aleatório
  return lista[randomico];
}

function moveToPage(page) {
  fullpage_api.moveTo(page);
}
