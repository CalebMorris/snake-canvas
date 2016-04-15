
class SpeedSettingController {
  constructor(labelElement, increaseElement, decreaseElement, updateGameSpeedFunc) {
    this.labelElement = labelElement;
    this.increaseElement = increaseElement;
    this.decreaseElement = decreaseElement;
    this.updateGameSpeedFunc = updateGameSpeedFunc;

    this.speed = 1;

    this.listenerRefs = {
      increase : this.onClick.bind(this, true),
      decrease : this.onClick.bind(this, false),
    };
    this.attachListeners();
  }

  onClick(shouldIncrease) {
    this.speed *= shouldIncrease ? 2 : 0.5;
    console.log('next speed', this.speed);
    this.updateGameSpeedFunc(1000 / (this.speed));
    this.labelElement.textContent = (this.speed).toFixed(2);
  }

  attachListeners() {
    this.increaseElement.addEventListener('click', this.listenerRefs.increase, false);
    this.decreaseElement.addEventListener('click', this.listenerRefs.decrease, false);
  }

  detachListeners() {
    this.increaseElement.removeEventListener('click', this.listenerRefs.increase);
    this.decreaseElement.removeEventListener('click', this.listenerRefs.decrease);
  }
}

class SettingsController {
  constructor(document, gameController) {
    this.speedController = new SpeedSettingController(
      document.getElementById('speed'),
      document.getElementById('speed-increase'),
      document.getElementById('speed-decrease'),
      value => {
        gameController.updateSpeed = value;
        return gameController.updateSpeed;
      }
    );
  }
}

export default SettingsController;
