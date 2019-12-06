new fullpage("#fullpage", {
  autoScrolling: true,
  allowScrolling: false,
  anchors: ["page1", "page2", "page3"]
});

console.log(fullpage_api)

fullpage_api.setAllowScrolling(false);
fullpage_api.setRecordHistory(true);

let palavra_sorteada = document.querySelector("#palavra");
let temaSorteado = "";

let times_futebol = ["Corinthians", "Vasco", "Palmeiras", "Bahia", "Flamengo"];
let animais = ["gato", "Cachorro", "Galinha", "Periquito", "papagio"];
let prof = ["Pedreiro", "Programador", "Juiz", "cantor", "Professor", "Ator"];


function playGame(tema) {
  
  fullpage_api.setAllowScrolling(true);

  switch (tema) {
    case "animais":
      temaSorteado = sorteio(animais);
      break;
    case "prof":
      temaSorteado = sorteio(prof);
      break;
    case "times":
      temaSorteado = sorteio(times_futebol);
      break;
  }

  palavra_sorteada.innerText = temaSorteado;
  fullpage_api.moveTo("page2");
  fullpage_api.setAllowScrolling();
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

function loadCredits() {
  fullpage_api.moveTo('page3');
}

function loadOptions() {
  //fullpage_api.moveTo('page1');
}

/* class App{

   constructor(){
    fullPage
   }

   
} */

//module.exports = new App();
