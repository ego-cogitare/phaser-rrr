import config from '../Config';

/**
 * Complexity level menu
 */

export default class {

  constructor() {
    game.settings = game.settings || {};
    Object.assign(game.settings, { players: 1 });

    this.skullPositions = {
      '1': {
        x: 150,
        y: 400,
      },
      '2': {
        x: 150,
        y: 540,
      }
    };
  }

  initskull(playersCount = 1) {
    this.skull.position.x = this.skullPositions[playersCount].x;
    this.skull.position.y = this.skullPositions[playersCount].y;
    this.skull.visible = true;
    clearInterval(this.intId);
    this.intId = setInterval(() => {
      this.skull.visible = !this.skull.visible;
    }, 500);
  }

  create() {
    const upButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    const downButton = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    const enterButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    upButton.onDown.add((e) => {
      if (++game.settings.players > 2) {
        game.settings.players = 1;
      }
      this.initskull(game.settings.players);
    });

    downButton.onDown.add((e) => {
      if (--game.settings.players < 1) {
        game.settings.players = 2;
      }
      this.initskull(game.settings.players);
    });

    /**
     * Players amount chosed. Go to player select screen
     */
    enterButton.onDown.add((e) => {
      game.state.start('SelectDriver');
    });

    /**
     * Add background image
     * @type {[type]}
     */
    const image = game.add.image(0, 0, 'complexity-01');
    image.width = config.screenWidth;
    image.height = config.screenHeight;

    /**
     * Add pointer (skull)
     * @type {[type]}
     */
    this.skull = game.add.sprite(0, 0, 'complexity-02');
    this.skull.width = 100;
    this.skull.height = 82;
    this.initskull(game.settings.players);
  }
};
