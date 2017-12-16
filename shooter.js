function Shooter(x, y, width, height, color, ctx, gameWidth) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.ctx = ctx;
  this.color = color;
  this.isMoving = false;
  this.gameWidth = gameWidth;
  this.newX = 0;
  this.prevNewX = this.newX -1;
  this.postNewX = this.newX +1;
  this.movingRight = true;
}

Shooter.prototype.update = function () {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
}

Shooter.prototype.newPos = function () {
  this.x += this.speedX;
} 

Shooter.prototype.newXCreator = function () {
  var minX = 0;
  var maxX = this.gameWidth - this.width;
  this.newX = (Math.floor(Math.random()*(maxX -minX)));
  return this.newX;
  console.log("newX: " + this.newX);
}

Shooter.prototype.moveLeft = function () {
  this.speedX = -this.speedX;
  console.log("moveLeft", this.speedX ) 
  this.movingRight = false;
}

Shooter.prototype.moveRight = function () {
  this.speedX = Math.abs(this.speedX);
  console.log("moveRight", this.speedX )
  this.movingRight = true;
}

Shooter.prototype.changeDirection = function () {
  if (this.movingRight == true) {
    this.moveLeft();
    this.newXCreator();
    console.log("New x is: " + this.newX);
  } else {
    this.moveRight();
    this.newXCreator();
    console.log("New x is: " + this.newX);
  }
}

