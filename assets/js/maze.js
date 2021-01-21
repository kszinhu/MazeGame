(function mazeRender() {
  var canvas = document.querySelector("canvas");
  var context = canvas.getContext("2d");
  
  // Controle do comprimento/altura do canvas
  var WIDTH = canvas.width,
    HEIGHT = canvas.height;

  // Keys do Teclado
  var LEFT = 37,
    UP = 38,
    RIGHT = 39,
    DOWN = 40;
  
  // Variáveis de controle da movimentação
  var mvLeft = (mvUp = mvRight = mvDown = false);

  // Tamanho do muro
  let size = 64;

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
    width: 96,
    height: 96, // 64 <- Altura das paredes
    speed: 2,
  };

  /* Mapa do Labirinto 
  1 = Muro | 0 = Espaço Vazio
  */
  let maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
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

  // Muro
  for (let row in maze) {
    for (let column in maze[row]) {
      let aux = maze[row][column];
      if (aux === 1) {
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
    for (let i in walls) {
      let wall = walls[i];
      // Verificar colisão
      blockRectangle(player, wall);
    }
  }

  function render() {
    // Renderização dos Muros do Labirinto e do Personagem
    context.clearRect(0, 0, WIDTH, HEIGHT);
    context.save();

    for (let row in maze) {
      for (let column in maze[row]) {
        let aux = maze[row][column];
        if (aux == 1) {
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
