function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Position {
  /*
   * A game-domain object for defining where elements of game-objects exist.
   * Position will always be a multiple of 1 (for snake) and will be used to
   *  determine hit boxes (see `equals`) and for renderinging
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Generate random position in x,y range
   * @param  {int} minX Minimum x position (inclusive)
   * @param  {int} minY Minimum y position (inclusive)
   * @param  {int} maxX Maximum x position (inclusive)
   * @param  {int} maxY Maximum y position (inclusive)
   * @return {Position} Generated random position
   */
  static random(minX, minY, maxX, maxY) {
    return new Position(randomRange(minX, maxX), randomRange(minY, maxY));
  }

  equals(otherPosition) {
    return this.x === otherPosition.x && this.y === otherPosition.y;
  }

  /**
   * Translates game-domain to render-domain to simplify rendering the game object
   * @param  {int} segmentSize Size of each game segmentSize
   * @param  {int} offsetX     Any offset for rendering in X direction
   * @param  {int} offsetY     Any offset for rendering in X direction
   * @return {Position}        render-domain position
   */
  toRenderDomain(segmentSize, offsetX, offsetY) {
    return new Position(segmentSize * this.x + offsetX, segmentSize * this.y + offsetY);
  }
}

export default Position;
