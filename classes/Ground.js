class Ground {
  constructor() {
    this.tileList = [];

    let canvasWidthCeil =
      CANVAS_WIDTH - (CANVAS_WIDTH % TILE_SIZE) + TILE_SIZE * 4;

    for (var i = 0; i <= canvasWidthCeil; i += TILE_SIZE) {
      this.tileList.push(new GroundTile(i, GROUND_Y));
    }

    this.lastTile = this.tileList[this.tileList.length - 1];
  }

  update() {
    this.tileList.forEach(tile => {
      tile.show();
      tile.update();
    });
  }
}

class GroundTile {
  constructor(x, y) {
    this.speed = MARIO_SPEED;
    this.width = TILE_SIZE;
    this.position = new Vector(x, y);
    this.rightEnd = this.position.x + this.width;
  }

  show() {
    image(groundTile, this.position.x, this.position.y);
  }

  update() {
    if (this.position.x <= -32) {
      this.position.x = ground.lastTile.rightEnd;
      ground.lastTile = this;
    }

    this.position.x += MARIO_SPEED * (deltaTime / 20);
    this.rightEnd = this.position.x + this.width;
  }
}
