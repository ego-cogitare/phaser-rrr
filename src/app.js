import Config from './js/Config';
import SplashScreen from './js/states/SplashScreen';
import PlayersCount from './js/states/PlayersCount';
import SelectDriver from './js/states/SelectDriver';
import BuyCar from './js/states/BuyCar';

/**
 * [game description]
 * @type {[type]}
 */
window.game = new Phaser.Game(Config.screenWidth, Config.screenHeight, Phaser.AUTO, 'RRR');

/**
 * Game screens
 */
game.state.add('SplashScreen', SplashScreen);
game.state.add('PlayersCount', PlayersCount);
game.state.add('SelectDriver', SelectDriver);
game.state.add('BuyCar', BuyCar);

/**
 * Set active screen
 */
game.state.start('SplashScreen');
