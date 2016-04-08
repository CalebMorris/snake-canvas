import GameController from './game-controller';

require('./Assets/style.scss');

(function(window, document) {

  const canvas = document.getElementById('game-canvas');
  const fpsLabel = document.getElementById('fps');
  const context = canvas.getContext('2d');

  const gameController = new GameController(canvas, context, canvas.width, canvas.height, window.requestAnimationFrame);

  setInterval(() => {
    fpsLabel.textContent = gameController.fps.toFixed(2);
  }, 500);

  gameController.start();

}(window, window.document));
