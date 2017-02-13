import characters from '../../config/characters';

export default class {

  constructor() {
    // Get and clone awailable characters to select
    this.characters = JSON.parse(JSON.stringify(characters.slice(0, 7)));

    this.characterId = 0;

    // Set selected players config
    game.settings.players = game.settings.players || [];
  }

  create() {
    const leftButton = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    const rightButton = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    const enterButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    leftButton.onDown.add((e) => {
      this.switchCharacter(-1);
    });

    rightButton.onDown.add((e) => {
      this.switchCharacter(+1);
    });

    // On character selected
    enterButton.onDown.add((e) => {
      game.settings.players.push({
        id: this.characters[this.characterId].id
      });

      // Check if all players already select their characters
      if (game.settings.players.length === game.settings.playersCount) {
        game.state.start('BuyCar');
      }

      // Exclude from available characters just selected one
      this.characters = this.characters.filter((character) => character.id !== this.characters[this.characterId].id);

      this.textPlayer.setText('Player ' + (game.settings.players.length + 1));

      // Reset to first character
      this.characterId = 0;

      // Display character info
      this.switchCharacter(0);
    });

    game.add.image(0, 0, 'driver-select-01');
    this.playerDriver = game.add.sprite(40, 355, 'characters');
    this.playerDriver.frame = this.characters[this.characterId].id;

    this.textPlayer = game.add.bitmapText(390, 340, 'font', 'Player 1', 24);
    this.textCharacterName = game.add.bitmapText(270, 390, 'font', '', 24);

    // Show current (default) character
    this.switchCharacter(0);
  }

  switchCharacter(direction) {
    if (direction > 0) {
      ++this.characterId;
    }
    if (direction < 0) {
      --this.characterId;
    }

    if (this.characterId < 0) {
      this.characterId = this.characters.length - 1;
    }
    if (this.characterId >= this.characters.length) {
      this.characterId = 0;
    }

    // Get selected character config
    const character = this.characters[this.characterId];

    // Set character avatar
    this.playerDriver.frame = character.id;

    // Display character information (name, parametres, etc)
    this.textCharacterName.setText(character.name);
  }
};
