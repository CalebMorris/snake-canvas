
const defaultButtonColors = Object.freeze({
  base: '#F44336',
  pressed: '#D32F2F',
  hover: '#E53935',
});

class ButtonController {
  constructor(element, context, maxWidth, maxHeight, onStartCallback) {
    this.ctx = context;
    this.element = element;
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this.onStartCallback = onStartCallback;

    this.buttonLeft = this.maxWidth * 0.2 + 20;
    this.buttonTop = this.maxHeight * 0.6 - 20;
    this.buttonWidth = this.maxWidth * 0.6 - 40;

    this.buttonHeight = 80;
    this.isButtonClicked = false;
    this.isAwaitingUnclick = false;
    this.isButtonHovered = false;
    this.buttonColor = defaultButtonColors.base;
    this.buttonColorPressed = defaultButtonColors.pressed;
    this.buttonColorHover = defaultButtonColors.hover;

    // Event Handlers Init
    this.eventRefs = {
      mousedown : this.handleClick.bind(this),
      mouseup : this.handleRelease.bind(this),
      mousemove : this.handleMove.bind(this),
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

    this.render();
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
        this.element.style.cursor = 'auto';
        return;
      }

      this.isButtonClicked = false;
    }
    this.render();
  }

  handleMove(event) {
    let elemLeft = this.element.offsetLeft;
    let elemTop = this.element.offsetTop;

    let x = event.pageX - elemLeft;
    let y = event.pageY - elemTop;

    if (x >= this.buttonLeft && x <= this.buttonLeft + this.buttonWidth &&
        y >= this.buttonTop && y <= this.buttonTop + this.buttonHeight) {
      this.isButtonHovered = true;
      this.element.style.cursor = 'pointer';
      this.render();
    } else if (this.isButtonHovered) {
      this.isButtonHovered = false;
      this.isButtonClicked = false;
      this.element.style.cursor = 'auto';
      this.render();
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

export default ButtonController;
