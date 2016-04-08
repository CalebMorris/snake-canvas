import InputController from './input-controller';
import MenuController from './menu/menu-controller';
import SnakeController from './snake-controller';
import { FoodFactory } from './food-controller';

class GameController {
  constructor(element, context, width, height, requestAnimFrame) {
    if (width <= 0) throw new Error('width must be greater than 0');
    if (height <= 0) throw new Error('height must be greater than 0');
    if (! context) throw new Error('Missing context');
    if (! requestAnimFrame) throw new Error('Missing requestAnimFrame');

    this.ctx = context;
    this.element = element;
    this.width = width;
    this.height = height;
    this.isGameRunning = false;
    this.requestAnimFrame = requestAnimFrame;

    const segmentSize = 16;
    const gameWidth = Math.floor(width / segmentSize);
    const gameHeight = Math.floor(height / segmentSize);
    const offsetX = (this.width - segmentSize) / 2;
    const offsetY = (this.height - segmentSize) / 2;

    this.snakeController = new SnakeController(context, 16, gameWidth, gameHeight);
    this.foodController = new FoodFactory(context, segmentSize, offsetX, offsetY, gameWidth, gameHeight);
    this.menuController = new MenuController(element, context, width, height, this.onGameStart.bind(this));
    this.inputController = new InputController(element, {
      keyup : this.snakeController.onKeyInput.bind(this.snakeController),
    });

    this.currentFood = null;

    this.updateSpeed = 1000; // mili

    this.fps = 0;
    this.lastRun = null;

    this.showMenu();
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

    if (this.currentFood) {
      this.currentFood.render();
    }
    this.snakeController.render();

    this.updateFPS();

    if (this.isGameRunning) {
      requestAnimFrame(renderLoop);
    }
  }

  controllerLoop() {
    this.snakeController.move();

    if (this.currentFood) {
      if (this.snakeController.doesCollideWith(this.currentFood.position)) {
        // Nom-Nom
        this.currentFood = null;
        this.snakeController.increaseTail();
      }
    } else {
      this.updateFood();
    }

    if (this.snakeController.hasCollided()) {
      this.gameOver();
      return;
    }

    if (this.isGameRunning) {
      setTimeout(this.controllerLoop.bind(this), this.updateSpeed);
    }
  }

  showMenu() {
    this.menuController.render();
  }

  onGameStart() {
    this.clearScreen();
    this.isGameRunning = true;
    this.renderLoop();
    this.controllerLoop();
  }

  gameOver() {
    this.isGameRunning = false;
    this.showMenu();
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
    this.showMenu();
  }
}

export default GameController;
