
class MenuController {
  constructor(element, context, maxWidth, maxHeight, onStartCallback) {
    this.ctx = context;
    this.element = element;
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this.onStartCallback = onStartCallback;

    // Button Init
    this.buttonLeft = this.maxWidth * 0.2 + 20;
    this.buttonTop = this.maxHeight * 0.6 - 20;
    this.buttonWidth = this.maxWidth * 0.6 - 40;
    this.buttonHeight = 80;
    this.isButtonClicked = false;
    this.isAwaitingUnclick = false;
    this.isButtonHovered = false;
    this.buttonColor = '#F44336';
    this.buttonColorPressed = '#E53935';
    this.buttonColorHover = '#D32F2F';

    // Event Handlers Init
    this.eventRefs = {
      mousedown : this.handleClick.bind(this),
      mouseup : this.handleRelease.bind(this),
      mousemove : this.handleRelease.bind(this),
    };
    this.attachListeners();
  }

  handleClick(event) {
    let elemLeft = this.element.offsetLeft;
    let elemTop = this.element.offsetTop;

    let x = event.pageX - elemLeft;
    let y = event.pageY - elemTop;

    if (x >= this.buttonLeft && x <= this.buttonLeft + this.buttonWidth &&
        y >= this.buttonTop && y <= this.buttonTop + this.buttonHeight) {
      this.isButtonClicked = true;
    } else {
      this.isButtonClicked = false;
    }

    this.renderPlayButton();
  }

  handleRelease(event) {
    let elemLeft = this.element.offsetLeft;
    let elemTop = this.element.offsetTop;

    let x = event.pageX - elemLeft;
    let y = event.pageY - elemTop;

    if (x >= this.buttonLeft && x <= this.buttonLeft + this.buttonWidth &&
        y >= this.buttonTop && y <= this.buttonTop + this.buttonHeight) {
      if (this.isButtonClicked) {
        this.detachListeners();
        this.onStartCallback();
        return;
      }

      this.isButtonClicked = false;
    }
    this.renderPlayButton();
  }

  handleMove(event) {
    let elemLeft = this.element.offsetLeft;
    let elemTop = this.element.offsetTop;

    let x = event.pageX - elemLeft;
    let y = event.pageY - elemTop;

    if (x >= this.buttonLeft && x <= this.buttonLeft + this.buttonWidth &&
        y >= this.buttonTop && y <= this.buttonTop + this.buttonHeight) {
      this.isButtonHovered = true;
      this.renderPlayButton();
    } else if (this.isButtonHovered) {
      this.isButtonHovered = false;
      this.isButtonClicked = false;
      this.renderPlayButton();
    }
  }

  attachListeners() {
    this.element.addEventListener('mousedown', this.eventRefs.mousedown, false);
    this.element.addEventListener('mouseup', this.eventRefs.mouseup, false);
    this.element.addEventListener('mousemove', this.eventRefs.mousemove, false);
  }

  detachListeners() {
    this.element.removeEventListener('mousedown', this.eventRefs.mousedown);
    this.element.removeEventListener('mouseup', this.eventRefs.mouseup);
    this.element.removeEventListener('mousemove', this.eventRefs.mousemove);
  }

  render() {
    this.ctx.fillStyle = '#90CAF9';
    this.ctx.fillRect(this.maxWidth * 0.2, this.maxHeight * 0.2, this.maxWidth * 0.6, this.maxHeight * 0.6);
    this.ctx.strokeStyle = '#42A5F5';
    this.ctx.strokeRect(this.maxWidth * 0.2, this.maxHeight * 0.2, this.maxWidth * 0.6, this.maxHeight * 0.6);
    this.ctx.fillStyle = 'black';
    this.ctx.font = '30px Arial';
    this.ctx.fillText('Menu Text', this.maxWidth * 0.2 + 20, this.maxHeight * 0.2 + 40, this.maxWidth * 0.6);
    this.renderPlayButton();
  }


  renderPlayButton() {
    if (this.isButtonClicked) {
      this.ctx.fillStyle = this.buttonColorPressed;
    } else if (this.isButtonHovered) {
      this.ctx.fillStyle = this.buttonColorHover;
    } else {
      this.ctx.fillStyle = this.buttonColor;
    }
    this.ctx.fillRect(this.buttonLeft, this.buttonTop, this.buttonWidth, this.buttonHeight);
    this.ctx.fillStyle = 'black';
    this.ctx.font = '30px Arial';
    this.ctx.fillText('Play Game', this.maxWidth * 0.2 + 40, this.maxHeight * 0.6 + 30, this.maxWidth * 0.6);
  }
}

export default MenuController;
