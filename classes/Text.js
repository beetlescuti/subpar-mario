class Header {
  constructor(text, duration, size, color, font) {
    this.alpha = 255;
    this.text = text;
    this.duration = duration;
    this.durationCounter = 0;
    this.size = size;
    this.color = color;
    this.font = font;
  }

  update() {
    this.draw();
    this.durationCounter += 1;
    if (this.durationCounter >= this.duration * 0.9 && this.alpha > 0) {
      this.alpha -= 2;
    }
  }

  draw() {
    textAlign(CENTER, CENTER);
    textFont(this.font);
    textSize(this.size);
    fill(this.color[0], this.color[1], this.color[2], this.alpha);
    text(this.text, CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
  }

}
