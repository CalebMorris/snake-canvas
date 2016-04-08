import ButtonController from './button-controller';

class MenuController {
  constructor(element, context, maxWidth, maxHeight, onStartCallback) {
    this.ctx = context;
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this.onStartCallback = onStartCallback;

    this.playButton = new ButtonController(element, context, maxWidth, maxHeight, onStartCallback);
  }

  render() {
    this.ctx.fillStyle = '#90CAF9';
    this.ctx.fillRect(this.maxWidth * 0.2, this.maxHeight * 0.2, this.maxWidth * 0.6, this.maxHeight * 0.6);
    this.ctx.strokeStyle = '#42A5F5';
    this.ctx.strokeRect(this.maxWidth * 0.2, this.maxHeight * 0.2, this.maxWidth * 0.6, this.maxHeight * 0.6);
    this.ctx.fillStyle = 'black';
    this.ctx.font = '30px Arial';
    this.ctx.fillText('Menu Text', this.maxWidth * 0.2 + 20, this.maxHeight * 0.2 + 40, this.maxWidth * 0.6);
    this.playButton.render();
  }
}

export default MenuController;
