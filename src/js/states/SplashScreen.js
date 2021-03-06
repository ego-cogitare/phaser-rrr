import Config from './../Config';
import Assets from './../Assets';

export default class {

  preload() {
    this.preloadingStart = Date.now();
    Assets.forEach((asset) => {
      this.game.load[asset.type](...asset.params);
    });
  }

  create() {
    this.assetsLoaded();

    game.state.start('SelectDriver');
    return false;

    game.stage.backgroundColor = Config.backgroundColor;
    const image = game.add.image(0, 0, 'splash-01');

    /**
     * Set splash screen
     */
    game.add.tween(image)
      .to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 3000)
      .onComplete.add(() => {
        game.state.start('PlayersCount');
      });
  }

  assetsLoaded() {
    console.log(
      '%cAssets preloaded in %s sec',
      'color: #1256A9; font-weight: bold',
      Number((Date.now() - this.preloadingStart) / 1000)
    );
  }
};
