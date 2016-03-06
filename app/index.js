let fps = 0;
let lastRun = null;
let lastPrint = new Date().getTime();

function showFPS(extra) {
  const timeSinceLastPrint = (new Date().getTime() - lastPrint);
  if (extra && timeSinceLastPrint > 500) {
    extra.textContent = `FPS: ${String(fps.toFixed(2))}`;
    lastPrint = new Date().getTime();
  }
}

(function(window, document) {

  const canvas = document.getElementById('game-canvas');
  const extra = document.getElementById('extra-content');
  const context = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  const isGameRunning = true;
  const shouldShowFPS = true;

  function gameLoop() {
    if (! lastRun) {
      lastRun = new Date().getTime();
      window.requestAnimationFrame(gameLoop);
      return;
    }

    var delta = (new Date().getTime() - lastRun) / 1000;
    lastRun = new Date().getTime();
    fps = 1 / delta;

    // Clear screen
    context.clearRect(0, 0, width, height);

    if (shouldShowFPS) showFPS(extra);

    if (isGameRunning) window.requestAnimationFrame(gameLoop);
  }

  gameLoop();

}(window, window.document));
