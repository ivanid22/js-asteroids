import Phaser from 'phaser';
import config from '../config/config';
import Button from '../controls/Button';

export default class TitleSecene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  create() {
    this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.5, 'gameBg');
    this.gameButton = new Button(this, config.width/2, config.height/2 - 100, 'blueButton1', 'blueButton2', 'Play', 'GameScene');
    this.optionsButton = new Button(this, config.width/2, config.height/2, 'blueButton1', 'blueButton2', 'Options', 'OptionsScene');
    this.creditsButton = new Button(this, config.width/2, config.height/2 + 100, 'blueButton1', 'blueButton2', 'Credits', 'CreditsScene');

    this.creditsButton.on(
      'pointerdown',
      () => {
        this.scene.start('GameScene');
      }
    );

    this.gameButton.on(
      'pointerdown',
      function () {
        this.scene.start('GameScene');
      }.bind(this)
    );

    this.input.on('pointerover', function (event, gameObjects) {
      gameObjects[0].setTexture('blueButton2');
    });

    this.input.on('pointerout', function (event, gameObjects) {
      gameObjects[0].setTexture('blueButton1');
    });
  }

}
