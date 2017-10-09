//contains the game logic

/** @class Game
*Represents a breakout game
*/

import Paddle from './paddle';
import Ball from './ball';
import Bricks from './bricks';

export default class Game
{
  constructor()
  {
    this.ballRadius = 10;
    this.paddle = new Paddle((1000 / 2) - 100, 1000-40);
    this.ball = new Ball(1000 / 2, 1000-60, this.ballRadius);
    this.brick = new Bricks(5, 10);
    this.over = false;
    this.input =
    {
      direction: "none"
    };
    this.score = 0;

    //sound stuff
    this.bounce = new Audio ("Bounce.wav");
    this.bounce.preload = "auto";
    this.bounce.load();
    this.lose = new Audio ("Lose.wav");
    this.lose.preload = "auto";
    this.lose.load();
    this.win = new Audio ("Win.wav");
    this.win.preload = "auto";
    this.win.load();
    //sound stuff

  // Create the back buffer canvas
  this.backBufferCanvas = document.createElement('canvas');
  this.backBufferCanvas.width = 1000;
  this.backBufferCanvas.height = 1000;
  this.backBufferContext = this.backBufferCanvas.getContext('2d');
  // Create the screen buffer canvas
  this.screenBufferCanvas = document.createElement('canvas');
  this.screenBufferCanvas.width = 1000;
  this.screenBufferCanvas.height = 1000;
  document.body.appendChild(this.screenBufferCanvas);
  this.screenBufferContext = this.screenBufferCanvas.getContext('2d');
  // Create HTML UI Elements
  var message = document.createElement('div');
  message.id = "message";
  message.textContent = "";
  document.body.appendChild(message);
  // Bind class functions
  this.gameOver = this.gameOver.bind(this);
  this.gameWin = this.gameWin.bind(this);
  this.handleKeyDown = this.handleKeyDown.bind(this);
//  this.handleKeyUp = this.handleKeyUp.bind(this);
  this.update = this.update.bind(this);
  this.render = this.render.bind(this);
  this.loop = this.loop.bind(this);
  // Set up event handlers
  window.onkeydown = this.handleKeyDown;
  window.onkeyup = this.handleKeyUp;

  // Start the game loop
  this.interval = setInterval(this.loop, 1000/60);
  }
  /** @function gameOver
  * Displays a game over message using the DOM
  */
  gameOver()
  {
    var message = document.getElementById("message");
    message.innerText = "Game Over";
    this.lose.play();
    this.over = true;
  }

/*
  handleKeyUp(event)
  {
    event.preventDefault();
    this.input.direction = "none";
  }
*/

  handleKeyDown(event)
  {
    event.preventDefault();
    switch(event.key)
    {
      case 'a':
      case 'ArrowLeft':
        this.input.direction = 'left';
        break;
      case 'd':
      case 'ArrowRight':
        this.input.direction = 'right';
        break;
      case 's':
      case "ArrowDown":
        this.input.direction = "none";
        break;
    }
  }

  /** @method update
    * Updates the game world.
    */
  update()
  {

    if(!this.over)
    {
      // determine if the snake hit a wall
      var positionBall = this.ball.getPosition();
      positionBall.x += this.ballRadius;
      positionBall.y += this.ballRadius;
      var positionPaddle = this.paddle.getPosition();

      var bricks = this.brick.getBricks();
      for(var c=0; c< 5; c++)
      {
        for(var r=0; r< 10; r++)
        {
            var b = bricks[c][r];
            if(b.status === 1)
            {
              //check for brick collision
                if(positionBall.x >= b.x && positionBall.x <= b.x + 85  && positionBall.y >= b.y && positionBall.y <= b.y + 30)
                {
                    this.ball.changeDirection(1, -1);
                    if( this.brick.update(c, r) >= 50)
                    {
                      this.gameWin();
                    }

                }
            }
         }
      }

      //end game if it goes out of bounds on bottom
      if(positionBall.y >= 1020)
       {
         return this.gameOver();
       }

       //move paddle
      this.paddle.update(this.input.direction);

      if( (positionBall.x <= positionPaddle.x + 200 && positionBall.x >= positionPaddle.x) && (positionBall.y <= 1000-40 && positionBall.y >= 1000-41) )
      {
        //this is for the top of the paddle
        var sound = this.bounce.cloneNode();
        sound.play();
        if(positionBall.x === 0 ||positionBall.x === 1000)
        {
          //special case for when ball hits the paddle and the wall
          this.ball.changeDirection(-1, -1);
        }
        else
        {
          this.ball.changeAngle(this.input.direction);
          this.ball.changeDirection(1, -1);
        }

      }
      else if( (positionBall.x === positionPaddle.x || positionBall.x === positionPaddle.x + 200) && (positionBall.y <= 1020 && positionBall.y >= 1000 - 41) )
      {
        //this is for the sides of the paddle
        var sound = this.bounce.cloneNode();
        sound.play();
        this.ball.changeAngle(this.input.direction);
        this.ball.changeDirection(-1, -1);
      }
      else if(positionBall.x >= 1000 || positionBall.x <=0)
      {
        //this is for left/right walls
        var sound = this.bounce.cloneNode();
        sound.play();
        this.ball.changeDirection(-1, 1);
      }
      else if(positionBall.y <= 0 && positionBall.x <= 1000 && positionBall.x >= 0 )
      {
        //this is for top wall
        var sound = this.bounce.cloneNode();
        sound.play();
        this.ball.changeDirection(1, -1);
      }
      else
      {
        this.ball.changeDirection(1,1);
      }
      this.ball.update()

    }
  }

  gameWin()
  {
    var message = document.getElementById("message");
    message.innerText = "You Win!";
    this.win.play();
    this.over = true;
  }
  /** @method render
  * Renders the game world
  */
  render()
  {
    this.backBufferContext.fillStyle = '#ccc';
    this.backBufferContext.fillRect(0, 0, 1000, 1000);
    this.brick.render(this.backBufferContext);
    this.ball.render(this.backBufferContext);
    this.paddle.render(this.backBufferContext);
    this.screenBufferContext.drawImage(this.backBufferCanvas,0,0);
  }

  loop()
  {
    this.update();
    this.render();
  }

}
