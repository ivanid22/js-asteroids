import 'phaser';
import { GameObjects } from 'phaser';
import Player from '../game/Player';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  static generateKeys(input) {
    return {
      W: input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      S: input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      A: input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      D: input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      SPACE: input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
    }
  }

  create() {
    this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.5, 'gameBg');
    
    console.log(this);

    this.anims.create({
      key: 'mantisAnim',
      frames: this.anims.generateFrameNumbers('mantisSprite', { start: 0, end: 1 }),
      frameRate: 20,
      repeat: true,
    });

    this.player = new Player(this, this.game.config.width * 0.5, this.game.config.height * 0.5, 'mantisNoJet');
    this.keys = GameScene.generateKeys(this.input);
    this.cameras.main.startFollow(this.player);
  }

  update() {
    this.player.update();
    this.infoText = `${this.player.body.rotation}`;
    if (this.keys.W.isDown) {
      this.player.thrustForward();
    } else if (this.keys.S.isDown) {
      this.player.thrustBackward();
    }

    if (this.keys.D.isDown) {
      this.player.rotateRight();
    } else if (this.keys.A.isDown) {
      this.player.rotateLeft();
    }
  }
}