// function Component(width, height, color, x, y) {
  // this.width = width;
  // this.height = height;
  // this.speedX = 0;
  // this.speedY = 0;
  // this.x = x;
  // this.y = y;
  // this.update = function () {
  //   ctx = MyGameArea.context;
  //   ctx.fillStyle = color;
  //   ctx.fillRect(this.x, this.y, this.width, this.height);
  // }
  // this.newPos = function () {
  //   if (this.x > MyGameArea.canvas.width - this.width) {
  //     this.x = MyGameArea.canvas.width - this.width;
  //     this.speedX = 0;
  //   } if (this.x < 0) {
  //     this.x += 1;
  //     this.speedX = 0;
  //   } else {
  //     this.x += this.speedX;
  //     this.y += this.speedY;
  //   }
  // }
//   this.crashWith = function () {
//     var mybottom = this.y + (this.height);
//     var crash = true;
//     if (mybottom < myGameArea.canvas.height) {
//       crash = false;
//     }
//     return crash;
//   }
//   this.randomMove = function () {

//   }
// }