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
    this.size = segmentSize;

    this.reset();
  }

  reset() {
    this.head = new Position(
      Math.floor(this.gameWidth / 2),
      Math.floor(this.gameHeight / 2)
    );
    this.tailStack = [];
    this.direction = Direction.up;
    this.shouldRedraw = true;

    this.removedPiece = null;
    this.canChangeDirection = true;
  }

  onKeyInput(event) {
    if (!event) return;
    if (this.canChangeDirection) {
      switch (event.keyCode) {
        case 37:
          if (this.direction !== Direction.right) {
            this.direction = Direction.left;
            this.canChangeDirection = false;
          }
          break;
        case 38:
          if (this.direction !== Direction.down) {
            this.direction = Direction.up;
            this.canChangeDirection = false;
          }
          break;
        case 39:
          if (this.direction !== Direction.left) {
            this.direction = Direction.right;
            this.canChangeDirection = false;
          }
          break;
        case 40:
          if (this.direction !== Direction.up) {
            this.direction = Direction.down;
            this.canChangeDirection = false;
          }
          break;
        default: break;
      }
    }
  }

  increaseTail() {
    if (this.tailStack.length > 0) {
      this.tailStack.push(this.tailStack[this.tailStack.length - 1]);
    } else {
      this.tailStack.push(this.removedPiece);
    }
  }

  move() {
    // Case 0: Head and no tail
    // Case 1: Head and tail
    this.removedPiece = this.head;
    if (this.tailStack.length > 0) {
      this.tailStack.unshift(this.head);
      this.removedPiece = this.tailStack.pop();
    }
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
    this.shouldRedraw = true;
    this.canChangeDirection = true;
    // console.log(`Head: ${this.head.toString()}, Tail: [${this.tailStack.map(v => v.toString())}]`);
  }

  /**
   * @param  {Position} gameObject Position of object to determine collisions
   * @return {bool}                Does it ~~blend~~ collide
   */
  doesCollideWith(gameObject) {
    return this.collidesWithTail(gameObject) || this.head.equals(gameObject);
  }

  collidesWithTail(gameObject) {
    for (var i = 0; i < this.tailStack.length; i++) {
      if (this.tailStack[i].equals(gameObject)) {
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
    this.collidesWithTail(this.head);

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
