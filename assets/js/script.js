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
  pincel.arc((x + 21)*multi, (y + 4)*multi, raio*multi, 0, 2 * Math.PI);
  pincel.fill();
}

function desenhaCirculo2(x, y, raio) {
  pincel.fillStyle = "#964b00";
  pincel.beginPath();
  pincel.arc((x + 20)*multi, y*multi, raio*multi, 0, 2 * Math.PI);
  pincel.fill();
}

function desenhaCirculo3(x, y, raio) {
  pincel.fillStyle = "#964b00";
  pincel.beginPath();
  pincel.arc((x + 20)*multi, (y + 40)*multi, raio*multi, 0, 2 * Math.PI);
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
  pincel.arc((x + 7)*multi, (y - 8)*multi, (raio-8)*multi, 0, 2 * Math.PI);
  pincel.fill();
}

function desenhaCirculo5(x, y, raio) {
  pincel.fillStyle = "black";
  pincel.beginPath();
  pincel.arc((x + 35)*multi, (y - 8)*multi, (raio-8)*multi, 0, 2 * Math.PI);
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
  desenhaCirculo3(x, y,raio2);
  desenhaCirculo2(x, y, raio2);
  desenhaCirculo(x, y, raio);
  desenhaCirculo4(x, y, raio);
  desenhaCirculo5(x, y, raio);
  //desenhaTriangulo(x, y);
}

var big = false;

setInterval(atualizaTela, 20);

function leDoTeclado(evento) {
  window.addEventListener("keydown", function (e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
    window.onkeydown = function (e) {
      if (e.keyCode == 13 && big == false) {
        // console.log("BOM DIA!"); COLOCA O SCRIPT DE DIMINUIR O TATU AQUI!
        big = true;
      } else {
        // console.log("BOA NOITE!"); COLOCA O SCRIPT DE AUMENTAR O TATU AQUI!
        big = false;
      }
    };
  });

  //   window.onmousedown = function() {

  //     console.log("BOM DIA");
  // }

  // // atribuindo diretamente a função anônima
  //  window.onmouseup = function() {

  //     console.log("BOA NOITE");
  // }

  if (evento.keyCode == cima) {
    y = y - taxa;
    PopUp(1);
  } else if (evento.keyCode == baixo) {
    y = y + taxa;
    PopUp(1);
  } else if (evento.keyCode == esquerda) {
    x = x - taxa;
    PopUp(1);
  } else if (evento.keyCode == direita) {
    x = x + taxa;
    PopUp(1);
  }
}

document.onkeydown = leDoTeclado;

tela.onmousemove = desenhaCirculo;

// atribuindo diretamente a função anônima
tela.onmousedown = function() {

    multi = 0.4;
}

// atribuindo diretamente a função anônima
 tela.onmouseup = function() {

    multi = 1;
}

/*
pincel.rotate(20 * Math.PI / 180);
pincel.fillRect(50, 20, 100, 50);

var tela = document.getElementById("canvas");
var ctx = c.getContext("2d");
ctx.rotate(20 * Math.PI / 180);
ctx.fillRect(50, 20, 100, 50); */