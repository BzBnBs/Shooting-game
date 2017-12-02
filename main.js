var enemy;
var player;

function startGame() {
  myGameArea.start();
  enemy = new component(30, 60, "red", 0, 0);
  player = new component(60, 15, "blue", 0, 450);
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 640;
    this.canvas.height = 480;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener('keydown', function (e) {
      // myGameArea.key = e.keyCode;
      console.log(e.keyCode)
      
      switch (e.keyCode) {
        case 37:
           moveleft();
          break;
        case 39:
          moveright();
          break;
        case 38:
          moveup();
          break;
        case 40:
         movedown();
         break;

      }
    });
    window.addEventListener('keyup', function (e) {
      console.log("keyUp: ", e.keyCode)
      // myGameArea.key = false;
    });
  },
  clear: function(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function component(width, height, color, x, y){
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function(){
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect (this.x, this.y, this.width, this.height);
  }
  this.newPos = function(){
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

function updateGameArea() {
  myGameArea.clear();
  enemy.newPos();
  enemy.update();
  player.newPos();
  player.update();
}

function moveup() {
  enemy.speedY -= 1;
  player.speedY -= 1;
}

function movedown() {
  enemy.speedY += 1;
  player.speedY += 1;
}

function moveleft() {
  enemy.speedX -= 1;
  player.speedX -= 1;
}

function moveright() {
  enemy.speedX += 1;
  player.speedX += 1;
}
























