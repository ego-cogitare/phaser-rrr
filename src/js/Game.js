import assets from './Assets';
import config from './Config';
import Car from './models/Car';

export default class Game {

  constructor() {
    this.game = new Phaser.Game(config.screenWidth, config.screenHeight, Phaser.AUTO, 'RRR', { preload: this.preload, create: this.create, update: this.update, render: this.render });
  }

  preload() {
    assets.forEach((asset) => {
      this.game.load[asset.type](...asset.params);
    });
  }

  create() {
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.game.stage.backgroundColor = config.backgroundColor;

    this.tank = new Car();

    this.tank.model.inputEnabled = true;
    this.tank.model.events.onInputDown.add(() => {
      this.tank.kill();
    }, this);

    //  Make our game world 2000x2000 pixels in size (the default is to match the game size)
    this.game.world.setBounds(0, 0, 2000, 2000);
  }

  update() {
    if (this.cursors.up.isDown) {
      this.tank.model.y -= 5;
      // this.game.camera.y -= 14;
    }
    else if (this.cursors.down.isDown) {
      this.tank.model.y += 5;
      // this.game.camera.y += 14;
    }

    if (this.cursors.left.isDown) {
      this.tank.model.x -= 5;
      // this.game.camera.x -= 14;
    }
    else if (this.cursors.right.isDown) {
      this.tank.model.x += 5;
      // this.game.camera.x += 14;
    }
  }

  render() {
    this.game.debug.cameraInfo(this.game.camera, 32, 32);
  }
}
