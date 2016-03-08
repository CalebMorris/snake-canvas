import GameController from './game-controller';

(function(window, document) {

  const canvas = document.getElementById('game-canvas');
  const extra = document.getElementById('extra-content');
  const context = canvas.getContext('2d');

  const gameController = new GameController(canvas.width, canvas.height, context, window.requestAnimationFrame);

  gameController.addHook(() => {
    extra.textContent = gameController.fps.toFixed(2);
  });

  gameController.start();

}(window, window.document));
