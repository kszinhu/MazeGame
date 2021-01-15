var tela = document.querySelector('canvas');
var pincel = tela.getContext('2d');
pincel.fillStyle = 'lightgray';
pincel.fillRect(0, 0, 600, 400);

var x = 20;
var y = 20;

// códigos do teclado

var esquerda = 37
var cima = 38
var direita = 39
var baixo = 40
var taxa = 10;

function desenhaCirculo(x, y, raio) {

  pincel.fillStyle = 'red';
    pincel.beginPath();
    pincel.arc(x+21, y+4, raio, 0, 2 * Math.PI);
    pincel.fill();
}


function desenhaCirculo2(x, y, raio) {

  pincel.fillStyle = 'brown';
    pincel.beginPath();
    pincel.arc(x+20, y, raio, 0, 2 * Math.PI);
    pincel.fill();
}

function desenhaCirculo3(x, y, raio) {

  pincel.fillStyle = 'brown';
    pincel.beginPath();
    pincel.arc(x+20, y+40, raio, 0, 2 * Math.PI);
    pincel.fill();
    
}

function desenhaRetangulo(x, y) {

  pincel.fillStyle = 'lightgray';
  pincel.beginPath();
  pincel.fillRect(0, 0, 600, 400);
 
}

function limpaTela() {

    pincel.clearRect(0, 0, 600, 400);
}

function desenhaCirculo4(x, y, raio) {

  pincel.fillStyle = 'black';
    pincel.beginPath();
    pincel.arc(x+7,y-8, 2, 0, 2 * Math.PI);
    pincel.fill();
}

function desenhaCirculo5(x, y, raio) {

  pincel.fillStyle = 'black';
    pincel.beginPath();
    pincel.arc(x+35, y-8, 2, 0, 2 * Math.PI);
    pincel.fill();
}


function atualizaTela() {

    limpaTela();
    desenhaCirculo3(x, y, 30);
    desenhaCirculo2(x, y, 30);
    desenhaCirculo(x, y, 10);
    desenhaCirculo4(x, y, 10);
    desenhaCirculo5(x, y, 10);
}



setInterval(atualizaTela, 20);

function leDoTeclado(evento) {

    if(evento.keyCode == cima) {

        y = y - taxa;

    } else if (evento.keyCode == baixo) {

        y = y + taxa;

    } else if (evento.keyCode == esquerda) {

        x = x - taxa;

    } else if (evento.keyCode == direita) {

        x = x + taxa;
    }
}

document.onkeydown = leDoTeclado;
