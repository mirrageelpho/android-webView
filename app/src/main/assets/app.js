new fullpage("#fullpage", {
  autoScrolling: true,
  allowScrolling: false,
  anchors: ["Inicio", "Play", "Sobre"]
});

const data = {
  times_futebol: [
    "Athletico Paranaense",
    "Atletico Mineiro",
    "Bahia",
    "Botafogo",
    "Chapecoense",
    "Corinthians",
    "Cruzeiro",
    "CSA",
    "Flamengo",
    "Fluminense",
    "Fortaleza",
    "Goias",
    "Gremio",
    "Internacional",
    "Palmeiras",
    "Santos",
    "Sao Paulo",
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
const message_content = document.querySelector(".message_content");
const message = document.querySelector(".message");
const dica = document.querySelector(".dica");

const opcoes = document.getElementsByClassName("opcoes");
const letra = document.getElementsByClassName("btn");
const keyboard = document.getElementsByClassName("key");

let tema_sorteado = "";
let pontuacao = 0;
let pontuacao_atual = 0;
let jogadas_restantes = 6;
let texto_oculto = [];
message_content.style.display = "none";

for (let i = 0; i < opcoes.length; i++) {
  opcoes[i].addEventListener("click", function() {
    playGame(opcoes[i].getAttribute("id"));
  });
}

for (let i = 0; i < letra.length; i++) {
  letra[i].addEventListener("click", function() {
    moveToPage(letra[i].textContent);
  });
}
for (let i = 0; i < keyboard.length; i++) {
  let letra = keyboard[i];
  letra.addEventListener("click", function() {
    compara_letra(letra);
  });
}

function playGame(tema) {
  fullpage_api.setAllowScrolling(true);
  message_content.style.display = "none";
  pontuacao = 0;
  jogadas_restantes = 6;
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
  

  tema_sorteado = tema_sorteado.split("");

  for (let i = 0; i < tema_sorteado.length; i++) {
    texto_oculto[i] = "-";
  }
  palavra_sorteada.innerText = texto_oculto.join("");
  moveToPage("Play");
  fullpage_api.setAllowScrolling(false);
}

function compara_letra(letra) {
  pontuacao_atual = pontuacao;

  for (let i = 0; i < tema_sorteado.length; i++) {
    if (tema_sorteado[i].toUpperCase() === letra.textContent) {
      texto_oculto[i] = letra.textContent; //monta o texto para mostrar na tela
      pontuacao++; //marca a pontuação
      palavra_sorteada.innerText = texto_oculto.join("");
    }
  }

  //Verifica se todas as letras foram encontradas
  if (pontuacao >= tema_sorteado.length) {
    message.innerText = "Você venceu!"
    message_content.style.display = "block";
  }
  //Verifica se houve pontuação
  if (pontuacao_atual == pontuacao) {
    jogadas_restantes--; //se Não houver pontuação diminue uma jogada
    if (jogadas_restantes <= 0) {
      message.innerText = "Você Perdeu!"
      message_content.style.display = "block";
    }
  }
}

//Algorítmo para realizar o sorteio
function sorteio(lista) {
  let randomico = Math.floor(Math.random() * lista.length); //gerando número aleatório
  return lista[randomico];
}

function moveToPage(page) {
  fullpage_api.moveTo(page);
}

function clear() {
  tema_sorteado = "";
  pontuacao = 0;
  pontuacao_atual = 0;
  jogadas_restantes = 0;
  texto_oculto = [];
}
