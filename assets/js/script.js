var body = document.querySelector(".objectbody");

body.addEventListener("onclick", rotation());



var tela = document.querySelector('canvas');
var pincel = tela.getContext('2d');
pincel.fillStyle = 'blue';
pincel.fillRect(0, 0, 600, 400);
pincel.beginPath();
pincel.fillRect(0,0,20,30);
pincel.fill();

var x = 20;
var y = 20;

var esquerda = 37;
var cima = 38;
var direita = 39;
var baixo = 40;
var taxa = 10;

function limpaTela() {

  pincel.clearRect(0, 0, 200, 100);
}

function atualizaTela() {
  limpaTela();
}

setInterval(atualizaTela, 20);

function leDoTeclado(evento) {
  if (evento.keycode == cima) {
    y = y - taxa;
  }else if (evento.keyCode == baixo) {
    y = y + taxa;
  }else if (evento.keycode == esquerda) {
    x = x - taxa;
  } else if (evento.keycode == direita) {
    x = x + taxa;
  }
}
document.onkeydown = leDoTeclado; 

