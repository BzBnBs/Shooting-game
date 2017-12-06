$(document).ready(function () {
  startGame();
});

function startGame() {
  var game = new MyGameArea()
  game.start();
}

//MODO DE THOR//
function MyGameArea () {
  this.canvas = document.createElement("canvas")
  this.context = this.canvas.getContext("2d");
  this.frameNo = 0;
  this.interval;
  // this.enemy = new Component(30, 60, "red", 0, 0);
  this.player = new Player(0, 450, 60, 15, "blue", this.context);
  // this.bomb = new Component(15, 15, "black", 7.5, 45);
}

MyGameArea.prototype.start = function() {
  this.canvas.width = 640;
  this.canvas.height = 480;
  document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  this.player.setKeys();
  this.interval = setInterval(this.updateGameArea.bind(this), 20);
}

MyGameArea.prototype.updateGameArea = function () {
  this.clear();
  this.frameNo += 1;
  // if (this.bomb.crashWith()) {
  //   this.stop();
  // } else {
  
  // this.bomb.update();
  // this.bomb.newPos();
  // this.enemy.update();
  this.player.newPos();
  this.isInsideCanvas(this.player);
  this.player.update();
}

MyGameArea.prototype.clear = function() {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

MyGameArea.prototype.stop = function(){
  clearInterval(this.interval);
}

MyGameArea.prototype.isInsideCanvas = function (component) {
  if (component.x > this.width - component.width) {
    component.x = this.width - component.width;
    component.speedX = 0;
  } if (component.x < 0) {
    component.x += 1;
    component.speedX = 0;
  } else {
    component.x += component.speedX;
  }
}

MyGameArea.prototype.everyinterval = function (n) {
  if ((MyGameArea.frameNo / n) % 1 == 0) { return true; }
  return false;
}


// function movedown() {
//   // enemy.speedY += 1;
//   // player.speedY += 1;
//   bomb.speedY += 1;
// }

