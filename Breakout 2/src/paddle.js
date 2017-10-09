//paddle.js

/** @class Paddle
* The paddle in the breakout game
*/

export default class Paddle
{
  constructor(x, y)
  {
    this.body = {x: x, y: y};
    this.speed = 10;
    this.direction = "none";
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.getPosition = this.getPosition.bind(this);
  }

  getPosition()
  {
    return {x: this.body.x, y: this.body.y};
  }

  update(input)
  {
    //get direction
    this.direction = input;

      switch(this.direction)
      {
        case 'right':
          this.body.x += this.speed;
          //if paddle hits the wall then undo movement
          if( this.body.x >= 805)
          {
            this.body.x -= this.speed;
          }
          break;
        case 'left':
          this.body.x -= this.speed;
          if(this.body.x <= -5 )
          {
            this.body.x += this.speed;
          }
          break;
      }
    //apply movement

  }

  render(ctx)
  {
    ctx.save();
    ctx.fillStyle = "red";
    ctx.fillRect(this.body.x, this.body.y, 200, 40);
    ctx.restore();
  }

}
