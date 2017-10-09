//ball.js

/** @class Ball
  * Our ball going around
*/

export default class Ball
{
  constructor(x, y, radius)
  {
    this.body = {x: x, y: y, radius: radius};
    this.speedx = 10;
    this.speedy = 10;
    this.getPosition = this.getPosition.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.changeDirection = this.changeDirection.bind(this);
  }

  getPosition()
  {
    return {x: this.body.x, y: this.body.y};
  }

  update()
  {
    this.body.x += this.speedx;
    this.body.y += this.speedy;
  }

  changeDirection(x, y)
  {
    this.speedx = this.speedx * x;
    this.speedy = this.speedy * y;
  }

  changeAngle(direction)
  {
    //if moving right double speed, otherwise half speed
    if (direction === "right")
    {
      this.speedx *= 2;
      if (this.speedx >= 20)
      {
        this.speedx = 20;
      }
    }
    else if (direction === "left")
    {
      this.speedx /= 2;
      if (this.speedx <= 5)
      {
        this.speedx = 5;
      }
    }
  }

  render(ctx)
  {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.body.x, this.body.y, this.body.radius, 0, Math.PI*2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

}
