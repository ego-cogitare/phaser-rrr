import assets from './AssetsPreload';
import config from './Config';

export default class Game {

  constructor() {
    this.game = window.game = new Phaser.Game(config.screenWidth, config.screenHeight, Phaser.CANVAS, 'RRR', { preload: this.preload, create: this.create, update: this.update, render: this.render });
  }

  preload() {
    assets.forEach((asset) => {
      this.game.load[asset.type](...asset.params);
    });
  }

  create() {
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.game.stage.backgroundColor = config.backgroundColor;

    let tank = window.tank = this.game.add.sprite(250, 250, 'player');
    tank.animations.add('tank');
    tank.animations.add('bang', [0, 1, 2, 3, 4]);
    // tank.animations.play('tank', 20, true);

    //  Make our game world 2000x2000 pixels in size (the default is to match the game size)
    this.game.world.setBounds(0, 0, 2000, 2000);
  }

  update() {
    if (this.cursors.up.isDown) {
      this.game.camera.y -= 14;
    }
    else if (this.cursors.down.isDown) {
      this.game.camera.y += 14;
    }

    if (this.cursors.left.isDown) {
      this.game.camera.x -= 14;
    }
    else if (this.cursors.right.isDown) {
      this.game.camera.x += 14;
    }
  }

  render() {
    this.game.debug.cameraInfo(this.game.camera, 32, 32);
  }
}
