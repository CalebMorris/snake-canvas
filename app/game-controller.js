import SnakeController from './snake-controller';
import { FoodFactory } from './food-controller';

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

    const segmentSize = 16;
    const gameWidth = width / segmentSize;
    const gameHeight = height / segmentSize;
    const offsetX = (this.width - segmentSize) / 2;
    const offsetY = (this.height - segmentSize) / 2;

    this.snakeController = new SnakeController(this.ctx, 16, offsetX, offsetY);
    this.foodController = new FoodFactory(context, segmentSize, offsetX, offsetY, gameWidth, gameHeight);

    this.currentFood = null;

    this.updateSpeed = 1000; // mili

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

  renderLoop() {
    var requestAnimFrame = this.requestAnimFrame;
    var renderLoop = this.renderLoop.bind(this);

    if (! this.lastRun) {
      this.lastRun = new Date().getTime();
      requestAnimFrame(renderLoop);
      return;
    }

    this.snakeController.render();
    this.currentFood.render();

    this.updateFPS();

    if (this.isGameRunning) {
      requestAnimFrame(renderLoop);
    }
  }

  controllerLoop() {
    if (this.isGameRunning) {
      this.snakeController.move();

      if (! this.currentFood) {
        this.updateFood();
      }

      setTimeout(this.controllerLoop.bind(this), this.updateSpeed);
    }
  }

  updateFood() {
    let food = this.foodController.randomFood();

    while (this.snakeController.doesCollideWith(food)) {
      food = this.foodController.randomFood();
    }

    this.currentFood = food;
  }

  start() {
    this.clearScreen();
    this.isGameRunning = true;
    this.renderLoop();
    this.controllerLoop();
  }
}

export default GameController;
