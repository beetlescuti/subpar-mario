const BUSH_TILES_SMALL_WIDTH = 96;
const CLOUD_TILES_WIDTH = 96;
const CLOUD_TILES_HEIGHT = TILE_SIZE * 2;
const BUSH_TILES_BIG_WIDTH = 160;

class SceneryManager {
  constructor() {
    this.sceneryList = [];
  }

  update() {
    this.spawn();
    this.sceneryList.filter(scenery => scenery.rightEnd >= 0).forEach(scenery => {
      scenery.update();
    })
  }

  spawn() {
    if (frameCount % 600 == 0 || frameCount % 748 == 0) {
      this.sceneryList.push(new Scenery(bushTilesSmall, CANVAS_WIDTH, 0, BUSH_TILES_SMALL_WIDTH, TILE_SIZE));
    }

    if(frameCount % 805 == 0 || frameCount % 1140 == 0)  {
      this.sceneryList.push(new Scenery(bushTilesBig, CANVAS_WIDTH, 0, BUSH_TILES_BIG_WIDTH, TILE_SIZE));
    }

    if(frameCount % 1200 == 0 || frameCount % 700 == 0) {
      this.sceneryList.push(new Scenery(cloudTiles, CANVAS_WIDTH, CANVAS_HEIGHT * 0.65, CLOUD_TILES_WIDTH, CLOUD_TILES_HEIGHT));
    }
  }
}

class Scenery {
  constructor(tiles, posX, posY, width, height) {
    this.tiles = tiles;
    this.width = width;
    this.height = height;
    this.position = new Vector(posX, posY);
    this.rightEnd = this.position.x + this.width;
  }

  update() {
    this.draw();
    this.position.x += MARIO_SPEED * (deltaTime / 20);
    this.rightEnd = this.position.x + this.width;
  }

  draw() {
    image(this.tiles, this.position.x, GROUND_Y - this.position.y - this.height, this.width, this.height);
  }
}
