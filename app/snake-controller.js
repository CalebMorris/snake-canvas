import Position from './position';

const Direction = Object.freeze({
  up : 0,
  right : 1,
  down : 2,
  left : 3,
});

class SnakeController {
  constructor(context, segmentSize, offsetX, offsetY) {
    // Offset is in pixels
    if (! context) throw new Error('Missing context');

    this.ctx = context;
    this.offsetX = offsetX;
    this.offsetY = offsetY;

    this.head = new Position(0, 0);
    this.pieceStack = [this.head];
    this.direction = Direction.up;
    this.shouldRedraw = true;
    this.size = segmentSize;

    this.removedPiece = null;
  }

  onKeyInput(event) {
    if (!event) return;
    console.log('event', event)
    switch (event.keyCode) {
      case 37:
        this.direction = Direction.left;
        break;
      case 38:
        this.direction = Direction.up;
        break;
      case 39:
        this.direction = Direction.right;
        break;
      case 40:
        this.direction = Direction.down;
        break;
      default: break;
    }
  }

  move() {
    switch (this.direction) {
      case Direction.up:
        this.head = new Position(this.head.x, this.head.y - 1);
        break;
      case Direction.right:
        this.head = new Position(this.head.x + 1, this.head.y);
        break;
      case Direction.down:
        this.head = new Position(this.head.x, this.head.y + 1);
        break;
      case Direction.left:
        this.head = new Position(this.head.x - 1, this.head.y);
        break;
      default:
        break;
    }
    this.removedPiece = this.pieceStack.pop();
    this.pieceStack.push(this.head);
    this.shouldRedraw = true;
  }

  /**
   * @param  {Position} gameObject Position of object to determine collisions
   * @return {bool}                Does it ~~blend~~ collide
   */
  doesCollideWith(gameObject) {
    for (var i = 0; i < this.pieceStack.length; i++) {
      if (this.pieceStack[i].equals(gameObject)) {
        return true;
      }
    }
    return false;
  }

  hasCollided() {
    // Edge
    // Itself
  }

  render() {
    if (this.shouldRedraw) {
      this.ctx.fillStyle = '#FF0000';
      const renderPosition = this.head.toRenderDomain(this.size, this.offsetX, this.offsetY);
      this.ctx.fillRect(renderPosition.x, renderPosition.y, this.size, this.size);

      if (this.removedPiece) {
        const removedRenderPostion = this.removedPiece.toRenderDomain(this.size, this.offsetX, this.offsetY);
        this.ctx.clearRect(removedRenderPostion.x, removedRenderPostion.y, this.size, this.size);
      }
      this.shouldRedraw = false;
    }
  }
}

export default SnakeController;
