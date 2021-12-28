const MARIO_HEIGHT = 30;
const MARIO_WIDTH = 32;
const MAX_JUMP_HEIGHT = 150;
const ANIMATION_INDEX_RUNNING = 0;
const ANIMATION_INDEX_JUMPING = 1;
const GRAVITY = 0.35;

class Mario extends Sprite {
  constructor(spritesheet, data) {
    super(spritesheet, data);
    this.width = MARIO_WIDTH;
    this.height = MARIO_HEIGHT;
    this.position = new Vector(300, MARIO_HEIGHT);
    this.rightEnd = this.position.x + this.width;
    this.bottomEnd = this.position.y - this.height;
    this.yAccel = 0;
    this.index = 0;
    this.speed = 0.2;
  }

  update() {
    mario.show();
    mario.animate();

    // Check for each obstacle, if after obstacles have moved horizontally, collision happened.
    // If so, Mario will be set left of the object he collided with.
    obstacleManager.obstacleList
      .filter(this.checkCollision, this)
      .forEach(obstacle => {
        this.setXPos(obstacle.position.x - this.width);
      }, this);

    // Move Mario vertically based on his current vertical Acceleration (yAccel).
    this.updateYPosWithYAccel();

    // Check for each obstacle, if after Mario has moved vertically, collision happened.
    // If so, check if he fell or jumped, set Mario on either top or bottom end of the obstacle
    // and change animation to ANIMATION_INDEX_RUNNING if he fell.
    obstacleManager.obstacleList
      .filter(this.checkCollision, this)
      .forEach(obstacle => {
        if (this.yAccel > 0) {
          this.setYPos(obstacle.bottomEnd);
          this.yAccel = this.yAccel * -0.5;
        } else {
          this.setYPos(obstacle.position.y + this.height);
        }
      }, this);

    // Check if he is on the ground and make sure he doesn't fall through it.
    if (this.position.y < this.height) {
      this.setYPos(this.height);
    }

    this.yAccel -= GRAVITY;
  }

  animate() {
    this.index += this.speed;
  }

  show() {
    let index =
      floor(this.index) % this.animations[this.selectedAnimation].length;
    image(
      this.animations[this.selectedAnimation][index],
      this.position.x,
      GROUND_Y - this.position.y
    );
  }

  checkCollision(obstacle) {
    return !(
      this.rightEnd <= obstacle.position.x ||
      obstacle.rightEnd <= this.position.x ||
      this.position.y <= obstacle.bottomEnd ||
      obstacle.position.y <= this.bottomEnd
    );
  }

  setXPos(xPos) {
    this.position.x = xPos;
    this.rightEnd = this.position.x + this.width;
  }

  setYPos(yPos) {
    this.position.y = yPos;
    this.bottomEnd = this.position.y - this.height;
    if (this.yAccel < 0) {
      this.selectedAnimation = ANIMATION_INDEX_RUNNING;
      this.yAccel = 0;
    }
  }

  updateYPosWithYAccel() {
    this.position.y += this.yAccel * (deltaTime / 20);
    this.bottomEnd = this.position.y - this.height;
    this.selectedAnimation = ANIMATION_INDEX_JUMPING;
  }
}
