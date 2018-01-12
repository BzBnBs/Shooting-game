class Shooter {
  constructor(x, y, width, height, color, ctx, gameWidth, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = 0;
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
    this.isMoving = false;
    this.gameWidth = gameWidth;
    this.newX = 0;
    this.prevNewX = this.newX - 1;
    this.postNewX = this.newX + 1;
    this.movingRight = true;
  }

  update() {

    if (this.type == "image") {
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    else {
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  newPos() {
    this.x += this.speedX;
  }
  newXCreator() {
    var minX = 0;
    var maxX = this.gameWidth - this.width;
    this.newX = (Math.floor(Math.random() * (maxX - minX)));
    return this.newX;
    console.log("newX: " + this.newX);
  }
  moveLeft() {
    this.speedX = -this.speedX;
    console.log("moveLeft", this.speedX);
    this.movingRight = false;
  }
  moveRight() {
    this.speedX = Math.abs(this.speedX);
    console.log("moveRight", this.speedX);
    this.movingRight = true;
  }
  changeDirection() {
    if (this.movingRight == true) {
      this.moveLeft();
      this.newXCreator();
      console.log("New x is: " + this.newX);
    }
    else {
      this.moveRight();
      this.newXCreator();
      console.log("New x is: " + this.newX);
    }
  }
}







