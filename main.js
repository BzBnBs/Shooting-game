$(document).ready(function () {
  startGame();
});

function startGame() {
  var canvas = document.getElementById("canvas");
  var game = new MyGameArea(canvas.getContext("2d"), canvas.width, canvas.height);
  game.start();
}

function MyGameArea (ctx, width, height) {
  this.width = width;
  this.height = height;
  this.context = ctx;
  this.interval;
  this.player = new Player(0, 450, 60, 15, "blue", this.context);
  this.shooter = new Shooter(0, 0, 30, 60, "red", this.context, this.width);
  // this.bomb = new Bomb(this.shooter.x, this.shooter.height/2, 30, 30, "black", this.context);
  this.setOfBombs = [];
}

MyGameArea.prototype.start = function() {
  this.interval = setInterval(this.updateGameArea.bind(this), 20);
  this.setKeys();
  this.increaseNumBombs();
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

MyGameArea.prototype.crashWith = function (bomb) {
    if (bomb.y + bomb.height >= this.height) {
    this.stop();
  }
}

MyGameArea.prototype.increaseNumBombs = function () {
  var pushBombs = setInterval(function () { this.setOfBombs.push(new Bomb(this.shooter.x, this.shooter.height / 2, 30, 30, "black", this.context)); }.bind(this), 2000);
  // var pushBombs = setInterval(function () { this.setOfBombs.push(this.bomb); }.bind(this), 2000);
  console.log(this.setOfBombs);
}

// MyGameArea.prototype.controlNumBombs = function () {
//   if(setOfBombs.length > 4){
//     clearInterval(pushBombs);
//   }
// }

MyGameArea.prototype.setKeys = function () {
  document.onkeydown = function (e) {
    switch (e.keyCode) {
      case 32:
        console.log("32");
        this.shooter.isMoving = true;
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
  
  //SOLO UNA BOMBA

//   this.clear();
//   this.player.newPos();
//   this.shooter.newPos();
//   this.shooter.checkBoundries();
//   this.delimitedByCanvas(this.player);
//   this.player.update();
//   this.shooter.update();
//   this.bomb.newPos();
//   if(!this.catchBomb()){
//     this.bomb.update();
//     this.crashWith();
//   } else {
//     this.bomb.clearBomb();
//   }
// }


  //VARIAS BOMBAS (SET OF BOMBS)

  this.clear();
  this.player.newPos();
  this.shooter.newPos();
  this.delimitedByCanvas(this.player);
  this.shooter.checkBoundries();
  this.setOfBombs.forEach(function(bomb, index){
    bomb.newPos();
    bomb.update();
    if (this.shooter.isMoving == true){
      bomb.moveDown();
    }
    bomb.update();
    if(this.player.catchBomb(bomb)){
      this.setOfBombs.splice(index, 1);
    }
    this.crashWith(bomb);
  }.bind(this))
  this.player.update();
  this.shooter.update();
}



