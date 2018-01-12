function Bomb(x, y, width, height, color, ctx, type) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speedY = 0;
  this.ctx = ctx;
  this.type = type;
  this.color = color;
  if (this.type == "image") {
    this.image = new Image();
    this.image.src = this.color;
  }
  // this.ctx.shadowColor = this.color;
  // this.ctx.shadowBlur = 10;
  // this.ctx.strokeStyle = this.color;
}

Bomb.prototype.update = function () {
  // this.ctx.fillStyle = this.color;
  // this.ctx.fillRect(this.x, this.y, this.width, this.height);
  if (this.type == "image") {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  else {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

Bomb.prototype.newPos = function () {
  this.y += this.speedY;
} 

Bomb.prototype.moveDown = function () {
  this.speedY = 5;
}