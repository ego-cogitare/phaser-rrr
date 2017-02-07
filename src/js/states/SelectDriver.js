export default class {
  preload() {
    
  }

  create() {
    const leftButton = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    const rightButton = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    leftButton.onDown.add((e) => {
      console.log('Left button selected');
    });

    rightButton.onDown.add((e) => {
      console.log('Right button selected');
    });
  }

  update() {
  }
};
