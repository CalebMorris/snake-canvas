class GameController {
  constructor(width, height, context, requestAnimFrame) {
    if (width <= 0) throw new Error('width must be greater than 0');
    if (height <= 0) throw new Error('height must be greater than 0');
    if (! context) throw new Error('Missing context');
    if (! requestAnimFrame) throw new Error('Missing requestAnimFrame');

    this.ctx = context;
    this.width = width;
    this.height = height;
    this.isGameRunning = false;
    this.requestAnimFrame = requestAnimFrame;

    this.fps = 0;
    this.lastRun = null;
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  updateFPS() {
    var delta = (new Date().getTime() - this.lastRun) / 1000;
    this.lastRun = new Date().getTime();
    this.fps = 1 / delta;
  }

  gameLoop() {
    var requestAnimFrame = this.requestAnimFrame;
    var gameLoop = this.gameLoop.bind(this);

    if (! this.lastRun) {
      this.lastRun = new Date().getTime();
      requestAnimFrame(gameLoop);
      return;
    }

    this.clearScreen();
    this.updateFPS();

    if (this.isGameRunning) {
      requestAnimFrame(gameLoop);
    }
  }

  start() {
    this.isGameRunning = true;
    this.gameLoop();
  }
}

export default GameController;
