import 'phaser';
import Button from '../controls/Button';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('OptionsScene');
  }

  preload() {
    
  }

  create() {
    this.text = this.add.text(300, 100, 'Options', { fontSize: 40 });
    this.musicButton = this.add.image(200, 200, 'checkedBox');
    this.musicText = this.add.text(250, 190, 'Music enabled', { fontSize: 24 });

    this.soundButton = this.add.image(200, 300, 'checkedBox');
    this.soundText = this.add.text(250, 290, 'Sound enabled', { fontSize: 24 });

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();

    this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'TitleScene');

    this.musicButton.on('pointerdown', function () {
      this.game.globals.musicOn = !this.game.globals.musicOn
      this.updateAudio();
    }.bind(this));

    this.soundButton.on('pointerdown', function() {
      console.log(this.game.globals.soundOn);
      this.game.globals.soundOn = !this.game.globals.soundOn;
      this.updateAudio();
    }.bind(this));

    this.updateAudio();
  }

  updateAudio() {
    if (!this.game.globals.musicOn) {
      this.musicButton.setTexture('box');
    } else {
      this.musicButton.setTexture('checkedBox');
    }

    if (!this.game.globals.soundOn) {
        this.soundButton.setTexture('box');
      } else {
        this.soundButton.setTexture('checkedBox');
    }
  }
}