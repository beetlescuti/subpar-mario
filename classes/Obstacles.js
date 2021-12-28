const OBSTACLE_WIDTH_RANGE = [TILE_SIZE * 4, TILE_SIZE * 10];
const OBSTACLE_Y_RANGE = [50, CANVAS_HEIGHT - 100];

class ObstacleManager {
  constructor() {
    this.obstacleList = [];
  }

  update() {
    obstacleManager.cleanUpObstacleList();
    obstacleManager.spawn();

    this.obstacleList.forEach(obstacle => {
      obstacle.show();
      obstacle.update();
    });
  }

  //spawns new obstacles
  spawn() {
    if (frameCount >= 500 && frameCount % 80 == 0) {
      let width = randomIntFromInterval(OBSTACLE_WIDTH_RANGE);
      let obstacle = new Obstacle(
        (width = width - (width % TILE_SIZE)),
        randomIntFromInterval(OBSTACLE_Y_RANGE)
      );
      this.obstacleList.push(obstacle);
    }
  }

  //checks if the left-most obstacle is out of screen and if so deletes it from obstacleList
  cleanUpObstacleList() {
    if (
      this.obstacleList[0] &&
      this.obstacleList[0].position.x <= -this.obstacleList[0].width
    ) {
      this.obstacleList.splice(0, 1);
    }
  }
}

class Obstacle {
  constructor(width, y) {
    this.height = TILE_SIZE;
    this.width = width;
    this.position = new Vector(WINDOW_SIZE, y);
    this.rightEnd = this.position.x + this.width;
    this.bottomEnd = this.position.y - this.height;
    this.xSpeed = MARIO_SPEED;
  }

  update() {
    this.position.x += this.xSpeed * (deltaTime / 20);
    this.rightEnd = this.position.x + this.width;
  }

  show() {
    for (var i = 0; i < this.width / TILE_SIZE; i++) {
      image(
        obstacleTile,
        this.position.x + i * TILE_SIZE,
        GROUND_Y - this.position.y
      );
    }
    // fill("white");
    // rect(this.position.x, GROUND_Y - this.position.y, this.width, this.height);
  }
}
