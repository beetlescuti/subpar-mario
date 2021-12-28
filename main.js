const WINDOW_SIZE = document.body.clientWidth;
const DEFAULT_CANVAS_WIDTH = 1000;
const CANVAS_WIDTH =
  WINDOW_SIZE > DEFAULT_CANVAS_WIDTH ? DEFAULT_CANVAS_WIDTH : WINDOW_SIZE;
const CANVAS_HEIGHT = 450;
const GROUND_HEIGHT = 32;
const GROUND_Y = CANVAS_HEIGHT - GROUND_HEIGHT;
const SKY_COLOR = "rgb(148, 148, 256)";
const GROUND_COLOR = "rgb(0, 177, 106)";
const TILE_SIZE = 32;
const MARIO_SPEED = -5;
const MUSIC_VOLUME = 0.2;
const EFFECTS_VOLUME = 0.2;

//ASSETS

let spritesheet;
let marioData;
let groundTile;

function preload() {
  soundFormats('mp3', 'ogg', 'wav');

  mainTheme = loadSound('assets/sounds/main_theme.mp3');
  jumpSound = loadSound('assets/sounds/jump-small.wav');
  coinSound = loadSound('assets/sounds/coin.wav');

  marioFont = loadFont("assets/fonts/super_mario_bros_2.ttf");
  spritesheet = loadImage("assets/spritesheet.png");
  marioData = loadJSON("assets/mario.json");
}

function setup() {

  noStroke();
  frameRate(140);

  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  obstacleTile = spritesheet.get(32, 0, TILE_SIZE, TILE_SIZE);
  groundTile = spritesheet.get(32, 32, TILE_SIZE, TILE_SIZE);
  bushTilesSmall = spritesheet.get(64, 96, TILE_SIZE * 3, TILE_SIZE);
  bushTilesBig = spritesheet.get(64, 64, TILE_SIZE * 5, TILE_SIZE);
  cloudTiles = spritesheet.get(64, 0, TILE_SIZE * 3, TILE_SIZE * 2);
  soundButtonImageOff = spritesheet.get(0, TILE_SIZE * 5, 18, 18);
  soundButtonImageOn = spritesheet.get(0, TILE_SIZE * 4, 18, 18);

  mainTheme.setVolume(MUSIC_VOLUME);
  coinSound.setVolume(EFFECTS_VOLUME);
  jumpSound.setVolume(EFFECTS_VOLUME);

  ground = new Ground();
  mario = new Mario(spritesheet, marioData, MARIO_WIDTH, MARIO_HEIGHT);
  obstacleManager = new ObstacleManager();
  sceneryManager = new SceneryManager();
  header = new Header("Subpar\nMario", 400, 54, [255, 255, 255], marioFont);
  soundButton = new SoundButton([soundButtonImageOff, soundButtonImageOn], new Vector(CANVAS_WIDTH - (30), 30 - 18), 18);
}

function draw() {
  drawBackground();
  header.update();
  sceneryManager.update();
  obstacleManager.update();
  console.log(mario.position);
  mario.update();
}

function keyPressed() {
  if (keyCode == UP_ARROW && mario.selectedAnimation == ANIMATION_INDEX_RUNNING) {
    mario.selectedAnimation = ANIMATION_INDEX_JUMPING;
    mario.yAccel = 10;

    if (getAudioContext().state !== 'running') {
      getAudioContext().resume();
    }
    jumpSound.play();
  }
}

function mousePressed() {
  if (mouseX >= soundButton.position.x &&
    mouseX <= soundButton.position.x + soundButton.width &&
    mouseY >= soundButton.position.y &&
    mouseY <= soundButton.position.y + soundButton.width ) {
      soundButton.play();
  }
}
//BACKGROUND
function drawBackground() {
  background(SKY_COLOR);
  ground.update();
  soundButton.draw();
}
