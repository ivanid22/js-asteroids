import 'phaser';
import Asteroid from '../game/Asteroid';
import AsteroidChunk from '../game/AsteroidChunk';
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
    console.log(this.game.globals)
    this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.5, 'gameBg');
    this.lastPlayerLaserShot = 0;
    this.chunksSpeed = 50;
    this.game.globals.score = 0;
    this.gameScore = 0;

    this.anims.create({
      key: 'mantisAnim',
      frames: this.anims.generateFrameNumbers('mantisSprite', { start: 0, end: 1 }),
      frameRate: 20,
      repeat: true,
    });

    this.anims.create({
      key: 'explosionAnimation',
      frames: this.anims.generateFrameNumbers('explosionSprite', {start: 0, end: 10 }),
      frameRate: 20,
      repeat: 0,
    });

    this.playerLasers = new Phaser.GameObjects.Group(this);
    this.asteroids = new Phaser.GameObjects.Group(this);
    this.asteroidChunks = new Phaser.GameObjects.Group(this);

    this.gameScoreText = this.add.text(10, 10, '0');
    this.gameScoreText.setScrollFactor(0, 0);
    this.player = new Player(this, this.game.config.width * 0.5, this.game.config.height * 0.5, 'mantisNoJet');
    this.player.setScale(0.5, 0.5);
    this.keys = GameScene.generateKeys(this.input);

    this.player.on('animationcomplete', () => {
      this.gameOver();
    }, this)

    this.cameras.main.startFollow(this.player);

    this.physics.add.collider(this.playerLasers, this.asteroids, ((laser, asteroid) => {
      laser.destroy();
      this.asteroidChunks.add(new AsteroidChunk(this, asteroid.body.x, asteroid.body.y, 'asteroidChunk', -this.chunksSpeed, this.chunksSpeed));
      this.asteroidChunks.add(new AsteroidChunk(this, asteroid.body.x, asteroid.body.y, 'asteroidChunk', this.chunksSpeed, this.chunksSpeed));
      this.asteroidChunks.add(new AsteroidChunk(this, asteroid.body.x, asteroid.body.y, 'asteroidChunk', this.chunksSpeed, -this.chunksSpeed));
      this.asteroidChunks.add(new AsteroidChunk(this, asteroid.body.x, asteroid.body.y, 'asteroidChunk', -this.chunksSpeed, -this.chunksSpeed));
      asteroid.goBoom();
      this.game.globals.score += 10;
    }).bind(this))

    this.physics.add.collider(this.player, this.asteroids, ((player, asteroid) => {
      asteroid.goBoom();
      player.hasCollided();
    }).bind(this))

    this.physics.add.collider(this.player, this.asteroidChunks, ((player, asteroidChunk) => {
      asteroidChunk.goBoom();
      player.hasCollided();
    }).bind(this));

    this.physics.add.collider(this.playerLasers, this.asteroidChunks, ((laser, asteroidChunk) => {
      laser.destroy();
      asteroidChunk.goBoom();
      this.game.globals.score += 5;
    }).bind(this));
  }

  updateScoreText() {
    this.gameScoreText.setText(`Score: ${this.game.globals.score}`);
  }

  updateAsteroids() {
    if(this.asteroids.children.entries.length <= 20) {
      let asteroidX, asteroidY;
      let valid = false;
      while(!valid) {
        asteroidX = Phaser.Math.Between(1, 2000);
        asteroidY = Phaser.Math.Between(1, 1100);
        if (Phaser.Math.Distance.Between(asteroidX, asteroidY, this.player.x, this.player.y) > 100) valid = true;
      }
      this.asteroids.add(new Asteroid(this, asteroidX, asteroidY));
    }
  }

  gameOver() {
    this.scene.pause();
  }
  
  update() {
    this.player.update();
    this.updateAsteroids();
    this.updateScoreText();
    this.lastPlayerLaserShot++;
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