import GameController from './game-controller';

(function(window, document) {

  const canvas = document.getElementById('game-canvas');
  const extra = document.getElementById('extra-content');
  const context = canvas.getContext('2d');

  const gameController = new GameController(canvas.width, canvas.height, context, window.requestAnimationFrame);

  setInterval(() => {
    extra.textContent = gameController.fps.toFixed(2);
  }, 500);

  gameController.start();

}(window, window.document));
