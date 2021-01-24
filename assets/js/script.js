var tela = document.querySelector("canvas");
var pincel = tela.getContext("2d");
pincel.fillStyle = "lightgray";
pincel.fillRect(0, 0, 1175, 500);

var multi = 1;
var x = 25;
var y = 25;
var n = 50;
var m = 75;
var z = 50;
var y = 100;
var raio = 10;
var raio2 = 30;

// códigos do teclado

var esquerda = 37;
var cima = 38;
var direita = 39;
var baixo = 40;
var taxa = 10;
var Enter = 13;

function desenhaCirculo(x, y, raio) {
  pincel.fillStyle = "red";
  pincel.beginPath();
  pincel.arc((x + 21) * multi, (y + 4) * multi, raio * multi, 0, 2 * Math.PI);
  pincel.fill();
}

function desenhaCirculo2(x, y, raio) {
  pincel.fillStyle = "#964b00";
  pincel.beginPath();
  pincel.arc((x + 20) * multi, y * multi, raio * multi, 0, 2 * Math.PI);
  pincel.fill();
}

function desenhaCirculo3(x, y, raio) {
  pincel.fillStyle = "#964b00";
  pincel.beginPath();
  pincel.arc((x + 20) * multi, (y + 40) * multi, raio * multi, 0, 2 * Math.PI);
  pincel.fill();
}

function desenhaRetangulo(x, y) {
  pincel.fillStyle = "black";
  pincel.beginPath();
  pincel.fillRect(0, 0, 1175, 500);
}

function limpaTela() {
  pincel.clearRect(0, 0, 1175, 500);
}

function desenhaCirculo4(x, y, raio) {
  pincel.fillStyle = "black";
  pincel.beginPath();
  pincel.arc(
    (x + 7) * multi,
    (y - 8) * multi,
    (raio - 8) * multi,
    0,
    2 * Math.PI
  );
  pincel.fill();
}

function desenhaCirculo5(x, y, raio) {
  pincel.fillStyle = "black";
  pincel.beginPath();
  pincel.arc(
    (x + 35) * multi,
    (y - 8) * multi,
    (raio - 8) * multi,
    0,
    2 * Math.PI
  );
  pincel.fill();
}
/*
function desenhaTriangulo(x, y) {
  pincel.beginPath();
  pincel.moveTo(x + 50, y + 25);
  pincel.lineTo(x + 75, y + 50);
  pincel.lineTo(x + 75, y);
  pincel.fill();
} */

function atualizaTela() {
  var image = document.querySelector("img#banner");
  var canvas = document.querySelector("canvas#image");

  canvas.width = image.width;
  canvas.height = window.innerHeight;

  limpaTela();
  desenhaCirculo3(x, y, raio2);
  desenhaCirculo2(x, y, raio2);
  desenhaCirculo(x, y, raio);
  desenhaCirculo4(x, y, raio);
  desenhaCirculo5(x, y, raio);
  //desenhaTriangulo(x, y);
}

setInterval(atualizaTela, 20);

function leDoTeclado(evento) {
  window.addEventListener("keydown", function (e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  });

  //   window.onmousedown = function() {

  //     console.log("BOM DIA");
  // }

  // // atribuindo diretamente a função anônima
  //  window.onmouseup = function() {

  //     console.log("BOA NOITE");
  // }

  /* Botão para abrir os PopUps
  if (evento.keyCode == cima) {
    y = y - taxa;
    newPopup();
  } else if (evento.keyCode == baixo) {
    y = y + taxa;
    newPopup();
  } else if (evento.keyCode == esquerda) {
    x = x - taxa;
    newPopup();
  } else if (evento.keyCode == direita) {
    x = x + taxa;
    newPopup();
  } 
  */
}

document.onkeydown = leDoTeclado;

tela.onmousemove = desenhaCirculo;

// atribuindo diretamente a função anônima
tela.onmousedown = function () {
  multi = 0.4;
};

// atribuindo diretamente a função anônima
tela.onmouseup = function () {
  multi = 1;
};

rotate = 0; // Declaramos uma variável com a rotação 0.
            
// document.addEventListener("DOMContentLoaded", function(){ // Usando eventListener, e quando a página for carregada...            
//   document.getElementById("next").addEventListener("click", function(){ //Quando houver um clique no botão next..                
//       if(rotate== 360){rotate = 0} //Verificamos se o valor da variável rotate é 360, se for zeramos o valor.                
//       rotate = rotate + 30; //Fazemoz um incremento de 30, ou seja se antes tinha 0 e incrementamos 30 temos o valor de 30, na próxima execução se temos 30 e incrementamos mais 30, vamos para 60 e assim por diante.                
//       document.getElementById("P1Image").style.transform = "rotate("+rotate+"deg)"; //Acessamos o elemento img e através do style.transform atribuimos o rotate com o valor atual de nossa variável.
//     });
//     document.getElementById("back").addEventListener("click", function(){ //Quando houver um clique no botão voltar..
//       if(rotate== -360){rotate = 0} //Verificamos se o valor da variável rotate é -360, se for zeramos o valor.
//       rotate = rotate + -30 ;//Fazemoz um incremento de -30, ou seja se antes tinha 0 e incrementamos -30 temos o valor de -30, na próxima execução se temos -30 e incrementamos mais -30, vamos para -60 e assim por diante. isto fará nosso elemento voltar.              
//       document.getElementById("P1Image").style.transform = "rotate("+rotate+"deg)"; //Acessamos o elemento img e através do style.transform atribuimos o rotate com o valor atual de nossa variável.
// });        
// });