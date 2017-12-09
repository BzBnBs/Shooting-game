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
}

Shooter.prototype.update = function () {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
}

Shooter.prototype.newPos = function () {
  this.x += this.speedX;
} 

Shooter.prototype.startMove = function () {
  this.isMoving = true;
}

Shooter.prototype.checkBoundries = function() {
  if (this.isMoving == true){
    if (this.x <= 0) {
      this.moveRight();
    }
    if (this.x >= this.gameWidth - this.width) {
      this.moveLeft();
    }
  }
}

Shooter.prototype.moveLeft = function () {
  this.speedX -= 1;
}

Shooter.prototype.moveRight = function () {
  this.speedX += 1;
}