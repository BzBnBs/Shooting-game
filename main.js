$(document).ready(function () {
  startGame();
});

function startGame() {
  var canvas = document.getElementById("canvas");
  var game = new MyGameArea(canvas.getContext("2d"), canvas.width, canvas.height);
  game.start();
}

//MODO DE THOR//
function MyGameArea (ctx, width, height) {
  this.width = width;
  this.height = height;
  this.context = ctx;
  this.frameNo = 0;
  this.interval;
  this.player = new Player(0, 450, 60, 15, "blue", this.context);
  this.shooter = new Shooter(0, 0, 30, 60, "red", this.context, this.width);
  // this.bomb = new Bomb(this.player.x, this.player.y, 30, 30, "black", this.context);
  this.bomb = new Bomb(this.shooter.x, this.shooter.height/2, 30, 30, "black", this.context);
  // this.bomb = new Component(15, 15, "black", 7.5, 45);
}

MyGameArea.prototype.start = function() {
  // this.shooter.setKeys();
  // this.player.setKeys();
  this.setKeys();
  this.interval = setInterval(this.updateGameArea.bind(this), 20);
}

MyGameArea.prototype.setKeys = function () {
  document.onkeydown = function (e) {
    switch (e.keyCode) {
      case 32:
        console.log("32");
        this.shooter.startMove();
        this.bomb.moveDown();
        // this.shooter.speed = true;
        // this.shooter.checkBoundries();
      case 37:
        this.player.moveLeft();
        break;
      case 39:
        this.player.moveRight();
        break;
    }
  }.bind(this);
}

MyGameArea.prototype.updateGameArea = function () {
  this.clear();
  this.frameNo += 1;
  // if (this.bomb.crashWith()) {
  //   this.stop();
  // } else {
  
  // this.bomb.update();
  // this.bomb.newPos();
  this.player.newPos();
  this.shooter.newPos();
  this.bomb.newPos();
  this.shooter.checkBoundries();
  this.delimitedByCanvas(this.player);
  // this.delimitedByCanvas(this.shooter);
  // if (this.bomb.seeBomb == true) {
  // } if (this.bomb.seeBomb == false) {
  // }
  this.player.update();
  if ( !this.catchBomb() ) {
    this.bomb.update();
  }
  this.shooter.update();
  this.crashWith();
}

MyGameArea.prototype.clear = function() {
  this.context.clearRect(0, 0, 640, 480);
}

MyGameArea.prototype.stop = function(){
  clearInterval(this.interval);
}

MyGameArea.prototype.delimitedByCanvas = function (component) {
  if (component.x > this.width - component.width) {
    component.x = this.width - component.width;
    component.speedX = 0;
  } if (component.x < 0) {
    component.x = 0;
    component.speedX = 0;
  } else {
    component.x += component.speedX;
  }
}

MyGameArea.prototype.everyinterval = function (n) {
  if ((MyGameArea.frameNo / n) % 1 == 0) { return true; }
  return false;
}

MyGameArea.prototype.catchBomb = function () {
  var bombBottomY = this.bomb.y + this. bomb.height;
  var playerTopY = this.player.y;
  var playerRightX = this.player.x + this.player.width;
  var bombRightX = this.bomb.x + this.bomb.width;
  var playerLeftX = this.player.x;
  var bombLeftX = this.bomb.x;
  // if (bombBottomY >= playerTopY && bombLeftX >= playerLeftX - this.bomb.width && bombRightX < playerLeftX + this.player.width) {
  //   // this.stop();

  //   return true
  //   this.bomb.color = "orange";
  //   this.bomb.disapear();
  // }else {
  //   return false
  // }
  return bombBottomY >= playerTopY && bombLeftX >= playerLeftX - this.bomb.width && bombRightX < playerLeftX + this.player.width
}

MyGameArea.prototype.crashWith = function () {
  // if (this.bomb.y + this.bomb.width >= this.height) {
    if (this.bomb.y + this.bomb.height >= this.height) {
    this.stop();
  }
}






