(function mazeRender() {
  var canvas = document.querySelector("canvas");
  var context = canvas.getContext("2d");

  var WIDTH = canvas.width,
    HEIGHT = canvas.height;

  var LEFT = 37,
    UP = 38,
    RIGHT = 39,
    DOWN = 40;
  var mvLeft = (mvUp = mvRight = mvDown = false);

  let size = 64;
  let sizesrc = 96;

  var walls = [];

  var img = new Image();
  img.src = "images/LuanG.png";

  var player = {
    x: size + 2,
    y: size + 2,
    width: 96,
    height: 96, // 64 <- Altura das paredes
    speed: 2
  };

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
  function blockRectangle(objA, objB) { // Colocar muro vermelho quando há atrito
    let distX = objA.x + objA.width / 2 - (objB.x + objB.width / 2);
    let distY = objA.y + objA.height / 2 - (objB.y + objB.height / 2);

    let sumWidth = (objA.width + objB.width) / 2;
    let sumHeight = (objA.height + objB.height) / 2;

    if (Math.abs(distX) < sumWidth && Math.abs(distY) < sumHeight) {
      let overlapX = sumWidth - Math.abs(distX);
      let overlapY = sumHeight - Math.abs(distY);

      if (overlapX > overlapY) {
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
      blockRectangle(player, wall);
    }
  }

  function render() {
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
    context.drawImage(
      img,
      player.x,
      player.y,
      player.width,
      player.height,
    );
    context.restore();
  }

  function loop() {
    update();
    render();
    requestAnimationFrame(loop, canvas);
  }
  requestAnimationFrame(loop, canvas);
})();
