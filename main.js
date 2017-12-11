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
  this.bomb = new Bomb(this.shooter.x, this.shooter.height/2, 30, 30, "black", this.context);
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

// MyGameArea.prototype.catchBomb = function () {
//   var bombBottomY = this.bomb.y + this. bomb.height;
//   var playerTopY = this.player.y;
//   var playerRightX = this.player.x + this.player.width;
//   var bombRightX = this.bomb.x + this.bomb.width;
//   var playerLeftX = this.player.x;
//   var bombLeftX = this.bomb.x;
//   return bombBottomY >= playerTopY && bombLeftX >= playerLeftX - this.bomb.width && bombRightX < playerLeftX + this.player.width
// }

MyGameArea.prototype.catchBomb = function () {
  var bombBottomY = this.bomb.y + this.bomb.height;
  var playerTopY = this.player.y;
  var playerRightX = this.player.x + this.player.width;
  var bombRightX = this.bomb.x + this.bomb.width;
  var playerLeftX = this.player.x;
  var bombLeftX = this.bomb.x;
  return bombBottomY >= playerTopY && bombLeftX >= playerLeftX - this.bomb.width && bombRightX <= playerRightX + this.bomb.width;
}

MyGameArea.prototype.crashWith = function () {
    if (this.bomb.y + this.bomb.height >= this.height) {
    this.stop();
  }
}

MyGameArea.prototype.increaseNumBombs = function () {
  var myVar = setInterval(function () { this.setOfBombs.push(new Bomb(this.shooter.x, this.shooter.height / 2, 30, 30, "black", this.context)); }.bind(this), 2000);
  console.log(this.setOfBombs);
}

MyGameArea.prototype.setKeys = function () {
  document.onkeydown = function (e) {
    switch (e.keyCode) {
      case 32:
        console.log("32");
        this.shooter.startMove();
        // this.setOfBombs.forEach(function (e, i) {
        //   this.setOfBombs[i].moveDown();
        // })
        this.bomb.moveDown();
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
  this.shooter.checkBoundries();
  this.delimitedByCanvas(this.player);
  this.player.update();
  this.shooter.update();
  this.setOfBombs.forEach(function (e, i) {
    this.setOfBombs[i].newPos();
    this.setOfBombs[i].moveDown();
    this.setOfBombs[i].update();
  }.bind(this))
  this.crashWith()
}



  // this.bomb.update();
  // this.bomb.newPos();

  // if ( !this.catchBomb() ) {
  //   this.bomb.update();
  //   this.crashWith();
  // } else {
  //  this.clearBomb();
  // }

    // if (!this.catchBomb()) {
    // }
    // if (this.catchBomb()) {
    //     this.setOfBombs.splice(i, 1);
    // }
    // this.bomb.update();
    // this.setOfBombs[i].crashWith();

  // this.setOfBombs.forEach(function(e,i){
  //   if (!this.setOfBombs[i].catchBomb()) {
  //     this.setOfBombs[i].update();
  //     this.setOfBombs[i].crashWith();
  //   } else {
  //     this.setOfBombs.splice(0,1);
  //   }
  // }.bind(this))
  // this.crashWith();
  // if (this.catchBomb()) {
  //    this.setOfBombs.splice(0,1);
  // }



