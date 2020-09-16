import 'phaser';

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

    this.load.image('gameBg', 'assets/game-bg.png');
    this.load.spritesheet('mantisSprite', 'assets/mantis-spritesheet.png', { frameWidth: 78, startFrame: 1 });
    this.load.image('redLaser', 'assets/red-laser.png');
    this.load.image('greenLaser', 'assets/green-laser.png');
    this.load.image('flea', 'assets/flea.png');
    this.load.image('louse', 'assets/louse.png');
    this.load.image('mantisNoJet', 'assets/mantis-nojet.png');
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
    this.scene.start('GameScene');
  }
}