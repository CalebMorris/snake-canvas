import Position from './position';

class Food {
  constructor(context, position, size, offsetX, offsetY) {
    this.ctx = context;
    this.position = position;
    this.size = size;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.hasDrawn = false;
    console.log('Food @', position);
  }

  render() {
    if (this.hasDrawn) return;
    this.ctx.fillStyle = '#0000FF';
    const renderPosition = this.position.toRenderDomain(this.size);
    this.ctx.fillRect(renderPosition.x, renderPosition.y, this.size, this.size);
  }
}

class FoodFactory {
  /*
   * `width`, `height` are game-domain max-range definitions (ex. 20 for a 400px board at 20px `segmentSize`)
   */
  constructor(context, segmentSize, offsetX, offsetY, width, height) {
    this.ctx = context;
    this.segmentSize = segmentSize;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.width = width;
    this.height = height;
  }

  randomFood() {
    return new Food(
      this.ctx,
      Position.random(0, 0, this.width, this.height),
      this.segmentSize,
      this.offsetX,
      this.offsetY
    );
  }
}

export { FoodFactory, Food };
