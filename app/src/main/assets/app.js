new fullpage("#fullpage", {
  autoScrolling: true,
  allowScrolling: false,
  anchors: ["Inicio", "Play", "Sobre"]
});

fullpage_api.setAllowScrolling(false); //Permite fazer rolagem da página Aceita um valor boleano

//inicializa as variáveis
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

const palavra_sorteada = document.querySelector("#palavra");
const message_content = document.querySelector(".message_content");
const message = document.querySelector(".message");
const dica = document.querySelector(".dica");
const mostra_jogadas = document.querySelector(".jogadas_restantes");

const cabeca = document.querySelector("#cabeca");
const bracoDir = document.querySelector("#braco_dir");
const bracoEsq = document.querySelector("#braco_esq");
const pernaDir = document.querySelector("#perna_dir");
const pernaEsq = document.querySelector("#perna_esq");
const corpo = document.querySelector("#corpo");

const opcoes = document.getElementsByClassName("opcoes");
const navegacao = document.getElementsByClassName("btn");
const keyboard = document.getElementsByClassName("key");

let tema_sorteado = "";
let pontuacao = 0;
let pontuacao_atual = 0;
let jogadas_restantes = 6;
let tema_oculto = [];
message_content.style.display = "none";

//mapeia os temas sorteados
for (let i = 0; i < opcoes.length; i++) {
  opcoes[i].addEventListener("click", function() {
    playGame(opcoes[i].getAttribute("id"));
  });
}
//mapeia os botões de navegação
for (let i = 0; i < navegacao.length; i++) {
  navegacao[i].addEventListener("click", function() {
    moveToPage(navegacao[i].textContent);
  });
}
//Carrega o teclado

for (let i = 0; i < keyboard.length; i++) {
  let letra = keyboard[i];

  letra.innerText = letra.getAttribute("id");

  letra.addEventListener("click", function() {
    compara_letra(letra);
  });
}

//Começa o jogo
function playGame(tema) {
  fullpage_api.setAllowScrolling(true);
  message_content.style.display = "none";
  pontuacao = 0;
  jogadas_restantes = 6;

  let dica_texto = "";

  switch (tema) {
    case "animais":
      dica_texto = "Um animal com ";
      tema_sorteado = sorteio(data.animais);
      break;
    case "profissoes":
      dica_texto = "Uma profissão com ";
      tema_sorteado = sorteio(data.profissoes);
      break;
    case "times":
      dica_texto = "Um time com ";
      tema_sorteado = sorteio(data.times_futebol);
      break;
  }

  cabeca.style.display = "none";
  corpo.style.display = "none";
  bracoDir.style.display = "none";
  bracoEsq.style.display = "none";
  pernaDir.style.display = "none";
  pernaEsq.style.display = "none";

  tema_oculto = esconder_texto(tema_sorteado);
  palavra_sorteada.innerText = tema_oculto.join("");
  tema_sorteado = tema_sorteado.split("");
  dica.innerText = dica_texto + tema_sorteado.length + " letras";
  mostra_jogadas.innerText = "Chances " + jogadas_restantes;
  moveToPage("Play");

  fullpage_api.setAllowScrolling(false);
}

//Transforma o texto em tracinhos
function esconder_texto(texto) {
  let texto_para_array = texto.split("");
  let letra_para_traco = [];
  for (let i = 0; i < texto_para_array.length; i++) {
    letra_para_traco[i] = "-";
  }
  return letra_para_traco;
}

//Compara as letras esolhidas com as letras da palavra
function compara_letra(letra) {
  pontuacao_atual = pontuacao;
  for (let i = 0; i < tema_sorteado.length; i++) {
    if (tema_sorteado[i].toUpperCase() === letra.textContent) {
      tema_oculto[i] = letra.textContent; //monta o texto para mostrar na tela
      pontuacao++; //marca a pontuação
      palavra_sorteada.innerText = tema_oculto.join("");
    }
  }

  //Verifica se todas as letras foram encontradas
  if (pontuacao >= tema_sorteado.length) {
    message.innerText = "Você venceu!";
    message_content.style.display = "block";
  }
  //Verifica se houve pontuação
  if (pontuacao_atual == pontuacao) {
    jogadas_restantes--; //se Não houver pontuação diminue uma jogada
    mostra_jogadas.innerText = "Chances " + jogadas_restantes;

    if (jogadas_restantes == 5) {
      cabeca.style.display = "block";
    }
    if (jogadas_restantes == 4) {
      corpo.style.display = "block";
    }

    if (jogadas_restantes == 3) {
      bracoDir.style.display = "block";
    }
    if (jogadas_restantes == 2) {
      bracoEsq.style.display = "block";
    }
    if (jogadas_restantes == 1) {
      pernaDir.style.display = "block";
    }

    if (jogadas_restantes <= 0) {
      pernaEsq.style.display = "block";
      message.innerText = "Você Perdeu!";
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
