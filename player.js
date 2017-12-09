function Player (x, y, width, height, color, ctx) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.ctx = ctx;
  this.color = color;
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