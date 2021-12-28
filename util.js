class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

//HELPER FUNCTIONS

function randomIntFromInterval(int) { // min and max included
  return Math.floor(Math.random() * (int[1] - int[0] + 1) + int[0])
}