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
  this.prevNewX = this.newX - 0.5;
  this.postNewX = this.newX + 0.5;
  return this.newX;
  console.log("newX: " + this.newX);
  return this.postNewX;
  return this.prevNewX;
}

Shooter.prototype.moveLeft = function () {
  this.speedX -= 1;
  this.movingRight = false;
}

Shooter.prototype.moveRight = function () {
  this.speedX += 1;
  this.movingRight = true;
}

//NEW VERSION
Shooter.prototype.changeDirection = function () {
  if (this.movingRight == true) {
    this.speedX = 0;
    this.movingRight = false;
    this.moveLeft();
    this.newXCreator();
    console.log("New x is: " + this.newX);
  } else {
    this.speedX = 0;
    this.movingRight = true;
    this.moveRight();
    this.newXCreator();
    console.log("New x is: " + this.newX);
  }
}
////////////////////////////////////
      
//OLD VERSION
// Shooter.prototype.changeDirection = function () {
//   // this.newXCreator();
//   // console.log(this.newXCreator);
//   // if (this.isMoving == true) {
//   console.log("prev change: " + this.speedX)
//   if (this.x <= 0) {
//     // this.speedX += 1;
//     this.movingRight = true;
//     this.moveRight();
//     console.log("post change 1: " + this.speedX)
//     // console.log(this.newXCreator());
//     // this.newXCreator();
//   } else if (this.movingRight == true && this.prevNewX <= this.newX <= this.postNewX) {
//     this.movingRight = false;
//     this.speedX = 0;
//     this.moveLeft();
//     console.log("post change 2: " + this.speedX)
//     // this.moveLeft();
//     // this.newXCreator();
//   } else if (this.movingRight == false && this.prevNewX <= this.newX <= this.postNewX) {
//     this.movingRight = true;
//     this.speedX = 0;
//     this.moveRight();
//     console.log("post change 3: " + this.speedX)
//     // this.newXCreator();
//   } else if (this.x >= this.gameWidth - this.width) {
//     this.movingRight = false;
//     this.moveLeft();
//     console.log("post change 4: " + this.speedX)
//     // this.newXCreator();
//   }
// }
///////////////////////////////

//NEW ALTERNATIVE
// Shooter.prototype.changeDirection = function () {
//   // this.newXCreator();
//   // console.log(this.newXCreator);
//   // console.log("prev change: " + this.speedX);
//   if (this.x <= 0) {
//     // this.speedX += 1;
//     this.moveRight();
//     console.log("post change 1: " + this.speedX);
//     // console.log(this.newXCreator());
//     this.newXCreator();
//   } else if (this.x >= this.gameWidth - this.width) {
//     this.moveLeft();
//     console.log("post change 4: " + this.speedX);
//     this.newXCreator();
//   } else if (this.prevNewX <= this.x <= this.postNewX) {
//     this.speedX = 0;
//     if (this.movingRight == true) {
//      this.moveLeft();
//      console.log("post change 2: " + this.speedX);
//      this.newXCreator();
//     } else if (this.movingRight == false) {
//       this.speedX = 0;
//      this.moveRight();
//      console.log("post change 3: " + this.speedX);
//      this.newXCreator();
//     }
//   }
// }
//////////////////////////////////   



        
        
        
        
        
        