new fullpage("#fullpage", {
  autoScrolling: true,
  allowScrolling: false,
  anchors: ["page1", "page2", "page3"]
});

fullpage_api.setAllowScrolling(false); //Permite fazer rolagem da página Aceita um valor boleano
fullpage_api.setRecordHistory(true); //Grava o histórico da navegação.

let palavra_sorteada = document.querySelector("#palavra");
let tema_sorteado = "";

let times_futebol = ["Corinthians", "Vasco", "Palmeiras", "Bahia", "Flamengo"];
let animais = ["gato", "Cachorro", "Galinha", "Periquito", "papagio"];
let prof = ["Pedreiro", "Programador", "Juiz", "cantor", "Professor", "Ator"];


function playGame(tema) {
  
  fullpage_api.setAllowScrolling(true);

  switch (tema) {
    case "animais":
      tema_sorteado = sorteio(animais);
      break;
    case "prof":
      tema_sorteado = sorteio(prof);
      break;
    case "times":
      tema_sorteado = sorteio(times_futebol);
      break;
  }

  palavra_sorteada.innerText = tema_sorteado;
  fullpage_api.moveTo("page2");
  fullpage_api.setAllowScrolling(false);

}

//Algorítmo para realizar o sorteio
function sorteio(lista) {

  let randomico;
  for (let i = 0; i < lista.length; i++) {
    randomico = Math.floor(Math.random() * lista.length); //gerando número aleatório
  }
  return lista[randomico];
}

function moveToPage(page) {
  fullpage_api.moveTo(page);
}
