import 'phaser';
import { GameObjects, Math } from 'phaser';
import Asteroid from '../game/Asteroid';
import Laser from '../game/Laser';
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
    this.lastPlayerLaserShot = 0;
    
    console.log(this);

    this.anims.create({
      key: 'mantisAnim',
      frames: this.anims.generateFrameNumbers('mantisSprite', { start: 0, end: 1 }),
      frameRate: 20,
      repeat: true,
    });

    this.playerLasers = new Phaser.GameObjects.Group(this);
    this.asteroids = new Phaser.GameObjects.Group(this);

    this.player = new Player(this, this.game.config.width * 0.5, this.game.config.height * 0.5, 'mantisNoJet');
    this.keys = GameScene.generateKeys(this.input);
    this.cameras.main.startFollow(this.player);
  }

  updateAsteroids() {
    if(this.asteroids.children.entries.length <= 20) {
      let asteroidX, asteroidY;
      let valid = false;
      while(!valid) {
        asteroidX = Phaser.Math.Between(1, this.game.config.width);
        asteroidY = Phaser.Math.Between(1, this.game.config.height);
        if (Phaser.Math.Distance.Between(asteroidX, asteroidY, this.player.x, this.player.y) > 100) valid = true;
      }
      this.asteroids.add(new Asteroid(this, asteroidX, asteroidY));
    }
  }
  
  update() {
    this.player.update();
    this.updateAsteroids();
    this.lastPlayerLaserShot++;
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

    if (this.keys.SPACE.isDown) {
      if (this.lastPlayerLaserShot >= this.player.getData('laserFrequency')) {
        this.playerLasers.add(new Laser(this, this.player.x, this.player.y, 'greenLaser', 1500, (this.player.rotation - 3.14/2)));
        this.lastPlayerLaserShot = 0;
      }
      
    }
  }
}