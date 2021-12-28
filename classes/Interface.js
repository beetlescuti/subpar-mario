class SoundButton {
  constructor(images, position, width) {
    this.status = 0;
    this.images = images;
    this.position = position;
    this.width = width;
  }

  play() {


    if (getAudioContext().state !== 'running') {
      getAudioContext().resume();
      
    }
    if (this.status) {
      mainTheme.pause();
      this.status = 0;
    } else {
      mainTheme.play();
      this.status = 1;
    }
  }

  draw() {
    image(this.images[this.status], this.position.x, this.position.y);
  }
}
