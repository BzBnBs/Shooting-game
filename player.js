function Player (x, y, width, height, color, ctx) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.ctx = ctx;
  this.color = color;
  this.ctx.shadowColor = this.color;
  this.ctx.shadowBlur = 10;
  this.ctx.strokeStyle = this.color;
  // this.ctx.
}

Player.prototype.update = function() {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
}

Player.prototype.newPos = function () {
  this.x += this.speedX;
} 

Player.prototype.moveLeft = function () {
  this.speedX -= 1;
}

Player.prototype.moveRight = function () {
  this.speedX += 1;
}

Player.prototype.catchBomb = function (bomb) {
  var bombBottomY = bomb.y + bomb.height;
  var playerTopY = this.y;
  var playerRightX = this.x + this.width;
  var bombRightX = bomb.x + bomb.width;
  var playerLeftX = this.x;
  var bombLeftX = bomb.x;
  return bombBottomY >= playerTopY && bombLeftX >= playerLeftX - bomb.width && bombRightX <= playerRightX + bomb.width;
}