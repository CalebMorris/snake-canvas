import GameController from './game-controller';
import SettingsController from './menu/settings-controller';

require('./Assets/style.scss');

(function(window, document) {

  const canvas = document.getElementById('game-canvas');
  const context = canvas.getContext('2d');

  const fpsLabel = document.getElementById('fps');
  const scoreLabel = document.getElementById('score');

  const gameController = new GameController(canvas, context, canvas.width, canvas.height, window.requestAnimationFrame);
  const settingsController = new SettingsController(document, gameController);

  gameController.scoreUpdateHook = (score) => {
    scoreLabel.textContent = score;
  };

  setInterval(() => {
    fpsLabel.textContent = gameController.fps.toFixed(2);
  }, 500);

  gameController.start();

}(window, window.document));
