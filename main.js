$(document).ready(function () {
  $('body').keyup(function(){
    $('body').css('background-image', 'url("img/black-wall-design.jpg")');
    $('#banner-score').removeClass('disable');
    $('#counter').removeClass('disable');
    $('ul').removeClass('disable');
    $('canvas').removeClass('disable');
  })
  startGame();
});

function startGame() {
  var canvas = document.getElementById("canvas");
  var game = new MyGameArea(canvas.getContext("2d"), canvas.width, canvas.height);
  // var canvas2 = document.getElementById("scoreboard");
  // var scoreboard = new MyGameArea(canvas2.getContext("2d"), canvas2.width, canvas2.height);
  game.start();
}

function MyGameArea (ctx, width, height) {
  this.width = width;
  this.height = height;
  this.context = ctx;
  this.interval;
  this.player = new Player(0, 450, 80, 10, "white", this.context);
  this.shooter = new Shooter(0, 0, 100, 60, "img/cloud-11.png", this.context, this.width, "image");
  // this.bomb = new Bomb(this.shooter.x, this.shooter.height/2, 30, 30, "black", this.context);
  this.setOfBombs = [];
  this.counter = 0;
  this.lifes = 3;
  this.catchingSound = new Audio('sound/Recoge.wav');
  this.loseLifeSound = new Audio('sound/Se escapa.wav');
  this.finishSound = new Audio('sound/Pierde Juego.wav');
  this.throwingSound = new Audio('sound/Lanza.wav');
  document.getElementById("counter").innerHTML = this.counter;
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
  // this.throwingSound.pause();
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
  if (bomb.y + bomb.height == this.height && this.lifes > 1) {
    this.deleteLifes();
  } 
  else if (bomb.y + bomb.height == this.height && this.lifes === 1) {
    $('ul li:last-child').css("background-image", "url('img/heart-09.png')");
    this.loseLifeSound.play();
    this.finishSound.play();
    this.stop();
  }
  console.log("num of lifes:" + this.lifes);
}

MyGameArea.prototype.deleteLifes = function () {
  if (this.lifes === 3) {
    this.lifes = 2;
    $('ul li:first-child').css("background-image", "url('img/heart-09.png')");
    this.loseLifeSound.play();
  }
  else if (this.lifes === 2) {
    this.lifes = 1;
    $('ul li:nth-child(2)').css("background-image", "url('img/heart-09.png')");
    this.loseLifeSound.play();
  }
}

MyGameArea.prototype.increaseNumBombs = function () {
  var pushBombs = setInterval(function () { 
    this.setOfBombs.push(
      new Bomb(this.shooter.x, this.shooter.height, 30, 30, "img/circle-05.png", this.context, "image")
    ); 
    // this.throwingSound.play();
  }.bind(this), 3000);
  console.log(this.setOfBombs);
}

// MyGameArea.prototype.controlNumBombs = function () {
//   if(setOfBombs.length > 4){
//     clearInterval(pushBombs);
//   }
// }

MyGameArea.prototype.counting = function () {
  this.counter += 1;
  document.getElementById("counter").innerHTML = this.counter;
  console.log("counter: " + this.counter);
}

MyGameArea.prototype.increaseShooterSpeed = function () {
  if (this.counter < 5){
    this.shooter.speedX = 1;
    console.log("Shooter's speed: " + this.shooter.speedX);
  } else if (this.counter <= 10){
    this.shooter.speedX = 4;
    console.log("Shooter's speed: " + this.shooter.speedX);
  } else if (this.counter <= 15){
    this.shooter.speedX = 8;
    console.log("Shooter's speed: " + this.shooter.speedX);
  }
}

MyGameArea.prototype.setKeys = function () {
  document.onkeydown = function (e) {
    switch (e.keyCode) {
      case 32:
        console.log("32");
        this.shooter.isMoving = true;
        //NEW VERSION
        this.shooter.newXCreator();
        console.log("New x is: " + this.shooter.newX);
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
  this.player.newPos();
  this.shooter.newPos();
  this.delimitedByCanvas(this.player);

  if (this.shooter.isMoving == true && this.shooter.x <= 0) {
    this.increaseShooterSpeed();
    this.shooter.movingRight = true;
    this.shooter.moveRight();
  } else if (this.shooter.isMoving == true && this.shooter.x >= this.width - this.shooter.x) {
    this.increaseShooterSpeed();
    this.shooter.movingRight = false;
    this.shooter.moveLeft();
  } else if (this.shooter.isMoving == true && this.shooter.x == this.shooter.newX) {
    this.shooter.changeDirection();
    this.increaseShooterSpeed();
  }

  this.setOfBombs.forEach(function(bomb, index){
    bomb.newPos();
    bomb.update();
    if (this.shooter.isMoving == true){
      bomb.moveDown();
    }
    bomb.update();
    if(this.player.catchBomb(bomb)){
      this.counting();
      this.catchingSound.play();
      // this.increaseSpeed();
      this.setOfBombs.splice(index, 1);
    }
    this.crashWith(bomb);
  }.bind(this))

  this.player.update();
  this.shooter.update();
}