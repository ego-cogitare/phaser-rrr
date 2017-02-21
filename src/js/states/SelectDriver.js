import characters from '../../config/characters';
import planetes from '../../config/planetes';

export default class {

  constructor() {
    // Get and clone awailable characters to select
    this.characters = JSON.parse(JSON.stringify(characters));

    this.characterId = 0;

    // Set selected players config
    game.settings.players = game.settings.players || [];
  }

  mapCharacterParam(param) {
    const paramsMap = {
      acceleration: 'Acceleration',
      jumping: 'Jumping',
      topSpeed: 'Top speed',
      cornering: 'Cornering',
      armor: 'Armor',
      weapon: 'Weapon'
    };

    return paramsMap[param];
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

    this.textPlayer = game.add.bitmapText(390, 340, 'font', 'Player 1', 20);
    this.textCharacterName = game.add.bitmapText(270, 380, 'font', '', 20);
    this.textPlanet = game.add.bitmapText(270, 410, 'font', '', 20);

    this.textParams = [];
    for (let i = 0; i < 4; i++) {
      this.textParams.push(game.add.bitmapText(270, 525 - i * 25, 'font', '', 20));
    }

    // Show current (default) character
    this.switchCharacter(0);
  }

  planeteByCharacter(character) {
    return planetes.filter((planete) => planete.id === character.planeteId)[0];
  }

  stringifyCharParam(character, param) {
    return '+' + character.parametres[param] + ' ' + this.mapCharacterParam(param);
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
    this.playerDriver.frame = character.sprite;

    // Display character information (name, parametres, etc)
    this.textCharacterName.setText(character.name);
    this.textPlanet.setText(this.planeteByCharacter(character).name);

    this.textParams.forEach((paramText) => paramText.setText(''));
    const charParams = Object.keys(character.parametres);
    charParams.forEach((param, key) => {
      this.textParams[key].setText(this.stringifyCharParam(character, param));
    });
  }
};
