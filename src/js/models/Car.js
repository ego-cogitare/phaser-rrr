export default class Car {

  constructor() {
    this.model = Game.add.sprite(250, 250, 'tank');
    this.model.animations.add('tank');
    this.model.animations.add('bang', [0, 1, 2, 3, 4]);
    this.model.animations.play('tank', 20, true);
  }

  reset() {
    this.model.loadTexture('tank');
    // this.model.animations.add('bang');
    this.model.animations.play('tank', 20, false);
  }

  kill() {
    this.model.loadTexture('bang');
    this.model.animations.add('bang');
    this.model.animations.play('bang', 12, false);

    this.model.events.onAnimationComplete.add(function() {
      this.reset();
    }, this);
  }
}
