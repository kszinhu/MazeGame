(function mazeRender() {
  var image = document.querySelector("img#banner");
  var canvas = document.querySelector("canvas#image");
  var context = canvas.getContext("2d");

  canvas.width = image.width;
  canvas.height = window.innerHeight;

  // Controle do comprimento/altura do canvas
  var WIDTH = canvas.width,
    HEIGHT = canvas.height,
    bigPlayer = false;

  // Keys do Teclado
  var LEFT = 37,
    UP = 38,
    RIGHT = 39,
    DOWN = 40,
    SPACE = 32;

  // Variáveis de controle da movimentação
  var mvLeft = (mvUp = mvRight = mvDown = false);

  // Tamanho do muro
  let size = 128;

  /*Array de Wall
    Wall é um objeto gerado a cada linha e coluna, contendo:
    x/y -> coordenada no canvas
    widht/height -> comprimento e largura do muro
  */
  var walls = [];

  // Imagem usada no personagem
  var img = new Image();
  img.src = "images/LuanG.png";

  /* Objeto personagem
    x/y -> coordenada do eixo central no canvas
    widht/height -> comprimento e largura do personagem
    speed -> velocidade da movimentação 
  */
  var player = {
    x: size + 2,
    y: size + 2,
    width: size*1.25,
    height: size*1.25, // 128 <- Altura das paredes
    speed: 2,
  };

  // Objeto Câmera
  var camera = {
    x: 0,
    y: 0,
    width: WIDTH, // Comp. do Canvas
    height: HEIGHT, // Altura do Canvas
    leftInnerBoundary: function () {
      // Fronteira Interna da Esquerda
      return this.x + this.width * 0.25; // Poderia ser "camera.x" invés de "this.x"
    },
    rightInnerBoundary: function () {
      // Fronteira Interna da Direita
      return this.x + this.width * 0.85;
    },
    topInnerBoundary: function () {
      // Fronteira Interna de Cima
      return this.y + this.height * 0.25;
    },
    bottomInnerBoundary: function () {
      // Fronteira Interna embaixo
      return this.y + this.height * 0.85;
    },
  };

  /* Mapa do Labirinto 
  1 = Muro | 0 = Espaço Vazio
  */
  let maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [2, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [2, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  /*
  "maze[0].length" retorna o número de colunas 
  "maze.length" retorna o número de linhas
  */
  let Mwidth = maze[0].length * size,
    Mheight = maze.length * size;

  // Muro
  for (let row in maze) {
    for (let column in maze[row]) {
      let aux = maze[row][column];
      if (aux == 1) {
        let wall = {
          x: size * column,
          y: size * row,
          width: size,
          height: size,
        };
        walls.push(wall);
      }
    }
  }

  function blockRectangle(objA, objB) {
    // [⚠]  Colocar muro vermelho quando há atrito, talvez seja uma possível adição

    let distX = objA.x + objA.width / 2 - (objB.x + objB.width / 2); // Distancia desses dois objetos no Eixo X
    let distY = objA.y + objA.height / 2 - (objB.y + objB.height / 2); // Distancia desses dois objetos no Eixo Y

    let sumWidth = (objA.width + objB.width) / 2;
    let sumHeight = (objA.height + objB.height) / 2;

    /*Se a distância absoluta da dist. entre os objetos no Eixo X/Y 
      é menor que a soma das larguras/alturas
    */
    if (Math.abs(distX) < sumWidth && Math.abs(distY) < sumHeight) {
      /* Se for verdade houve colisão 
      [1] Overlap = Quantidade da Sobreposição entre os objetos
      [2] Agora precisa saber qual eixo, houve a sobreposição (X ou Y)
      [3] Ademais precisamos saber se bateu de cima->baixo/baixo->cima (Operador ternário)
      */

      let overlapX = sumWidth - Math.abs(distX);
      let overlapY = sumHeight - Math.abs(distY);

      if (overlapX > overlapY) {
        // Operador Ternário -> Check ? True : False
        objA.y = distY > 0 ? objA.y + overlapY : objA.y - overlapY;
      } else {
        objA.x = distX > 0 ? objA.x + overlapX : objA.x - overlapX;
      }
    }
  }

  window.addEventListener("keydown", keydownHandler, false);
  window.addEventListener("keyup", keyupHandler, false);

  function keydownHandler(e) {
    var key = e.keyCode;
    // Pressionar a tecla
    switch (key) {
      case LEFT:
        mvLeft = true;
        break;
      case UP:
        mvUp = true;
        break;
      case RIGHT:
        mvRight = true;
        break;
      case DOWN:
        mvDown = true;
        break;
      case SPACE:
        bigPlayer = true;
        break;
    }
  }

  function keyupHandler(e) {
    // Parar de pressionar a tecla
    var key = e.keyCode;
    switch (key) {
      case LEFT:
        mvLeft = false;
        break;
      case UP:
        mvUp = false;
        break;
      case RIGHT:
        mvRight = false;
        break;
      case DOWN:
        mvDown = false;
        break;
      case SPACE:
        bigPlayer = false;
        break;
    }
  }

  function update() {
    // Movimentação nos Eixos
    if (mvLeft && !mvRight) {
      player.x -= player.speed;
    } else if (mvRight && !mvLeft) {
      player.x += player.speed;
    }
    if (mvUp && !mvDown) {
      player.y -= player.speed;
    } else if (mvDown && !mvUp) {
      player.y += player.speed;
    }
    //Controle de tamanho do player
    if (bigPlayer) {
      player.width = size*0.5;
      player.height = size*0.5;
    } else {
      player.width = size*1.25;
      player.height = size*1.25;
      }
    for (let i in walls) {
      let wall = walls[i];
      // Verificar colisão
      blockRectangle(player, wall);
    }

    // "Câmera" sobre o labirinto

    if (player.x < camera.leftInnerBoundary()) {
      /* Se o personagem tiver se deslocado além do limite a esquerda
      Então vamos ajustar as cordenadas em x da câmera:
      [1] Vai receber a posição do personagem menos 50% da largura da câmera
      */
      camera.x = player.x - camera.width * 0.25;
    }
    if (player.x + player.width > camera.rightInnerBoundary()) {
      // Right, como o final é a esquerda somamos a largura do personagem
      camera.x = player.x + player.width - camera.width * 0.85;
    }
    if (player.y < camera.topInnerBoundary()) {
      // Limite Top
      camera.y = player.y - camera.height * 0.25;
    }
    if (player.y + player.height > camera.bottomInnerBoundary()) {
      // Limite Buttom
      camera.y = player.y + player.height - camera.height * 0.85;
    }
    /* max() - Retorna MAIOR valor | min() Retorna MENOR valor
    
      [1] - Menor valor possível a esquerda, é 0 (Não vai exibir nada a esquerda do Canvas)

      [2] - Largura total do labirinto - a largura que a câmera exibe (extremo da câmera, exibe o extremo do labirinto)

      [*] Estou dizendo então que as cordenadas não podem ser nem menores que 0 e nem maiores que a largura/altura total do labirinto
    */
    camera.x = Math.max(0, Math.min(Mwidth - camera.width, camera.x));
    camera.y = Math.max(0, Math.min(Mheight - camera.height, camera.y));
  }

  function render() {
    // Responsive Canvas
    canvas.width = image.width;
    canvas.height = window.innerHeight;
    
    // Renderização dos Muros do Labirinto e do Personagem
    context.clearRect(0, 0, WIDTH, HEIGHT);
    context.save();
    context.translate(-camera.x, -camera.y);
    for (let row in maze) {
      for (let column in maze[row]) {
        let aux = maze[row][column];
        if (aux == 1 || aux == 2) {
          let x = column * size;
          let y = row * size;
          context.fillRect(x, y, size, size);
        }
      }
    }

    context.drawImage(img, player.x, player.y, player.width, player.height);
    context.restore();
  }

  function loop() {
    update();
    render();
    requestAnimationFrame(loop, canvas);
  }
  requestAnimationFrame(loop, canvas);
})();
