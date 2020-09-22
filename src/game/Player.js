import Phaser from 'phaser';
import Entity from './Entity';

export default class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player');
    this.setData('speed', 0);
    this.setData('maxSpeed', 300);
    this.setData('isShooting', false);
    this.setData('timerShootDelay', 10);
    this.setData('timerShootTick', this.getData('timerShootDelay') - 1);
    this.setData('laserFrequency', 20);
    super.setDepth(1);
  }

  static calcSpeedComponents(angle, speed) {
    const speedX = speed * Math.cos(angle);
    const speedY = speed * Math.sin(angle);
    return {
      speedX,
      speedY,
    };
  }

  hasCollided() {
    this.setData('hasCollided', true);
  }

  thrustForward() {
    const currentSpeed = this.getData('speed');
    if (currentSpeed <= this.getData('maxSpeed')) this.setData('speed', currentSpeed + 4);
  }

  thrustBackward() {
    const currentSpeed = this.getData('speed');
    if (currentSpeed >= -this.getData('maxSpeed')) this.setData('speed', currentSpeed - 4);
  }

  rotateLeft() {
    this.body.angularVelocity -= 150;
  }

  rotateRight() {
    this.body.angularVelocity += 150;
  }

  create() {
    this.on('animationcomplete', () => {
      this.scene.gameOver();
    }, this);
  }

  update() {
    if (this.getData('hasCollided')) {
      if (!this.getData('hasPlayedDeathAnimation')) {
        this.play('explosionAnimation', true);
        this.setData('hasPlayedDeathAnimation', true);
      }
      this.body.setVelocity(0);
      this.body.setAngularVelocity(0);
    } else {
      const { speedX, speedY } = Player.calcSpeedComponents(this.rotation - (Math.PI / 2), this.data.get('speed'));
      this.body.setVelocityX(speedX);
      this.body.setVelocityY(speedY);
      this.body.setAngularVelocity(0);
      this.x = Phaser.Math.Clamp(this.x, 0, 2000);
      this.y = Phaser.Math.Clamp(this.y, 0, 1100);
    }
  }
}