const Direction = Object.freeze({
  up : 0,
  right : 1,
  down : 2,
  left : 3,
});

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

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

  move() {
    switch (this.direction) {
      case Direction.up:
        this.head = new Position(this.head.x, this.head.y + 1);
        break;
      case Direction.right:
        this.head = new Position(this.head.x + 1, this.head.y);
        break;
      case Direction.down:
        this.head = new Position(this.head.x, this.head.y - 1);
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

  render() {
    if (this.shouldRedraw) {
      this.ctx.fillStyle = '#FF0000';
      this.ctx.fillRect(
        this.size * this.head.x + this.offsetX, this.size * this.head.y + this.offsetY,
        this.size, this.size
      );
      if (this.removedPiece) {
        this.ctx.clearRect(
          this.size * this.removedPiece.x + this.offsetX, this.size * this.removedPiece.y + this.offsetY,
          this.size, this.size
        );
      }
      this.shouldRedraw = false;
    }
  }
}

export default SnakeController;
