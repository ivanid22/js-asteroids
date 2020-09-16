import 'phaser';
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
      speedY
    }
  }

  thrustForward() {
    const currentSpeed = this.getData('speed');
    if (currentSpeed <= this.getData('maxSpeed')) this.setData('speed', currentSpeed + 2)
  }

  thrustBackward() {
    const currentSpeed = this.getData('speed');
    if (currentSpeed >= -this.getData('maxSpeed')) this.setData('speed', currentSpeed - 2);
  }

  rotateLeft() {
    this.body.angularVelocity -= 100;
  }

  rotateRight() {
    this.body.angularVelocity += 100;
  }

  update() {
    //this.body.setVelocity(0, 0);
    const { speedX, speedY  } = Player.calcSpeedComponents(this.rotation - (Math.PI / 2), this.data.get('speed'));
    this.body.setVelocityX(speedX);
    this.body.setVelocityY(speedY);
    this.body.setAngularVelocity(0);
    this.x = Phaser.Math.Clamp(this.x, 0, 2000);
    this.y = Phaser.Math.Clamp(this.y, 0, 1100);

  }
}