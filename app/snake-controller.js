import Position from './position';

const Direction = Object.freeze({
  up : 0,
  right : 1,
  down : 2,
  left : 3,
});

class SnakeController {
  constructor(context, segmentSize, gameWidth, gameHeight) {
    // Offset is in pixels
    if (! context) throw new Error('Missing context');

    this.ctx = context;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.head = new Position(
      Math.floor(this.gameWidth / 2),
      Math.floor(this.gameHeight / 2)
    );
    this.pieceStack = [];
    this.direction = Direction.up;
    this.shouldRedraw = true;
    this.size = segmentSize;

    this.removedPiece = null;
  }

  onKeyInput(event) {
    if (!event) return;
    switch (event.keyCode) {
      case 37:
        if (this.direction !== Direction.right) this.direction = Direction.left;
        break;
      case 38:
        if (this.direction !== Direction.down) this.direction = Direction.up;
        break;
      case 39:
        if (this.direction !== Direction.left) this.direction = Direction.right;
        break;
      case 40:
        if (this.direction !== Direction.up) this.direction = Direction.down;
        break;
      default: break;
    }
  }

  move() {
    this.removedPiece = this.pieceStack.length > 0 ? this.pieceStack.pop() : this.head;
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
    // this.pieceStack.push(this.head);
    this.shouldRedraw = true;
  }

  /**
   * @param  {Position} gameObject Position of object to determine collisions
   * @return {bool}                Does it ~~blend~~ collide
   */
  doesCollideWith(gameObject) {
    for (var i = 0; i < this.pieceStack.length; i++) {
      if (this.pieceStack[i].equals(gameObject)) {
        debugger
        return true;
      }
    }
    return false;
  }

  hasCollided() {
    // Edge
    if (this.head.x < 0 || this.head.x >= this.gameWidth || this.head.y < 0 || this.head.y >= this.gameHeight) {
      return true;
    }
    // TODO: Itself
    this.doesCollideWith(this.head);

    return false;
  }

  render() {
    if (this.shouldRedraw) {
      this.ctx.fillStyle = '#FF0000';
      const renderPosition = this.head.toRenderDomain(this.size);
      this.ctx.fillRect(renderPosition.x, renderPosition.y, this.size, this.size);

      if (this.removedPiece) {
        const removedRenderPostion = this.removedPiece.toRenderDomain(this.size);
        this.ctx.clearRect(removedRenderPostion.x, removedRenderPostion.y, this.size, this.size);
      }
      this.shouldRedraw = false;
    }
  }
}

export default SnakeController;
