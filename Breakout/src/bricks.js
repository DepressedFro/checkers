/** @class Bricks
  * Our ball going around
*/

export default class Bricks
{
  constructor(columns, rows)
  {
    this.score = 49;
    this.brickRows = rows;
    this.brickColumns = columns;
    this.brickWidth = 85;
    this.brickHeight = 30 ;
    this.explode = new Audio ("Explosion.wav");
    this.explode.preload = "auto";
    this.explode.load();
    //more padding = easier game
    this.brickPadding = Math.random() * (12 - 2) + 2;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.bricks = [];
    for(var c=0; c < this.brickColumns; c++)
    {
      this.bricks[c] = [];
      for(var r=0; r < this.brickRows; r++)
      {
          this.bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }

    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.getBricks = this.getBricks.bind(this);
  }

  getBricks()
  {
    return this.bricks;
  }

  update(c, r)
  {
    //destroy brick and then increment score
    var sound = this.explode.cloneNode();
    sound.play();
    this.bricks[c][r].status = 0;
    this.score += 1;
    return this.score;
  }

  render(ctx)
  {

    ctx.save();
    //go through the brick array and print the ones that haven't been destroyed
    for(var c=0; c < this.brickColumns; c++)
    {
      for(var r=0; r < this.brickRows; r++)
      {
        if( this.bricks[c][r].status === 1)
        {
          var brickX = (r * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
          var brickY = (c * (this.brickHeight +this.brickPadding)) + this.brickOffsetTop;
          this.bricks[c][r].x = brickX;
          this.bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
          ctx.fillStyle = "Green";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
    ctx.font = "30px Arial";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.shadowBlur=.01;
    ctx.fillText("Score: " + this.score, 500, 25);
    ctx.restore();
  }

}
