function Bomb(x, y, width, height, color, ctx) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speedY = 0;
  this.ctx = ctx;
  this.color = color;
}

Bomb.prototype.update = function () {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
}

Bomb.prototype.newPos = function () {
  this.y += this.speedY;
} 

Bomb.prototype.moveDown = function () {
  this.speedY = 1;
}

// Bomb.prototype.clearBomb = function () {
//   this.context.clearRect(this.x, this.y, this.width, this.height);
// }