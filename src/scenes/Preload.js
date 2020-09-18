import Phaser from 'phaser';
import asteroidChunkImg from '../../assets/asteroid-chunk.png';
import asteroidImg from '../../assets/asteroid.png';
import explosionImg from '../../assets/explosion.png';
import gameBgImg from '../../assets/game-bg.png';
import greenLaserImg from '../../assets/green-laser.png';
import mantisNoJetImg from '../../assets/mantis-nojet.png';
import explosionSfx from '../../assets/explosion.wav';
import laserSfx from '../../assets/laserfire01.ogg';
import backgroundMusic from '../../assets/background-music.ogg';
import blueButton1 from '../../assets/blue_button02.png';
import blueButton2 from '../../assets/blue_button03.png';
import checkedBox from '../../assets/blue_boxCheckmark.png';
import box from '../../assets/grey_box.png';


export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', function(value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', function(file) {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    }.bind(this));

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    this.load.image('gameBg', gameBgImg);
    this.load.spritesheet('explosionSprite', explosionImg, { frameWidth: 196, frameHeight: 190 });
    this.load.image('asteroid', asteroidImg);
    this.load.image('asteroidChunk', asteroidChunkImg);
    this.load.image('greenLaser', greenLaserImg);
    this.load.image('mantisNoJet', mantisNoJetImg);
    this.load.image('blueButton1', blueButton1);
    this.load.image('blueButton2', blueButton2);
    this.load.image('box', box);
    this.load.image('checkedBox', checkedBox);
    this.load.audio('explosionSfx', explosionSfx)
    this.load.audio('laserSfx', laserSfx);
    this.load.audio('backgroundMusic', backgroundMusic);
  }

  create() {

  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    /*this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('GameScene');
    }*/
    this.scene.start('TitleScene');
  }
}