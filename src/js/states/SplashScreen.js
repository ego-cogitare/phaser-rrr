import Config from './../Config';
import Assets from './../Assets';

export default class {
  preload() {
    Assets.forEach((asset) => {
      this.game.load[asset.type](...asset.params);
    });
  }

  create() {
    game.stage.backgroundColor = Config.backgroundColor;
    const image = game.add.image(0, 0, 'splash-01');

    /**
     * Set splash screen
     */
    game.add.tween(image)
      .to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 300)
      .onComplete.add(() => {
        game.state.start('PlayersCount');
      });
  }
};
