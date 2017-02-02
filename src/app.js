import Config from './js/Config';
import SplashScreen from './js/states/SplashScreen';
import StartMenu from './js/states/StartMenu';

/**
 * [game description]
 * @type {[type]}
 */
const game = window.game = new Phaser.Game(Config.screenWidth, Config.screenHeight, Phaser.AUTO, 'RRR');

/**
 * Game screens
 */
game.state.add("SplashScreen", SplashScreen);
game.state.add("StartMenu", StartMenu);

/**
 * Set active screen
 */
game.state.start("SplashScreen");
