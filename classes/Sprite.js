class Sprite {
  constructor(spritesheet, data) {
    this.animations = this.initAnimationsFromJSON(spritesheet, data);
    this.selectedAnimation = 0;
  }

  initAnimationsFromJSON(spritesheet, data) {
    let animations = [];
    for (var spriteBehavior in data) {
      let animation = [];
      if (data.hasOwnProperty(spriteBehavior)) {
        for (var i = 0; i < data[spriteBehavior].length; i++) {
          let pos = data[spriteBehavior][i].position;
          let frame = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
          animation.push(frame);
        }
      }
      animations.push(animation);
    }
    return animations;
  }
}
