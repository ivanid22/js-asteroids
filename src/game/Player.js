import 'phaser';
import Entity from './Entity';

export default class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player');
    this.setData('speed', 200);
    this.setData('isShooting', false);
    this.setData('timerShootDelay', 10);
    this.setData('timerShootTick', this.getData('timerShootDelay') - 1);
  }

  static calcSpeedComponents(player, speed) {
    

  }

  moveUp() {
    this.body.setVelocityX(this.body.velocity.x + 10);
    this.body.setVelocityY(this.body.velocity.y + 10);
    const {x, y} = this.scene.physics.velocityFromRotation(this.rotation - (Math.PI / 2), this.body.speed);
    this.body.setVelocityX(x);
    this.body.setVelocityY(y);
    console.log();
  }

  moveDown() {
    this.body.setVelocityX(this.body.velocity.x - 10);
    this.body.setVelocityY(this.body.velocity.y - 10);
    const {x, y} = this.scene.physics.velocityFromRotation(this.rotation - (Math.PI / 2), this.body.speed);
  }

  rotateLeft() {
    this.body.angularVelocity -= 100;
  }

  rotateRight() {
    this.body.angularVelocity += 100;
  }

  update() {
    //this.body.setVelocity(0, 0);
    this.body.setAngularVelocity(0);
    this.body.speed = this.body.speed - 5;
    console.log(this.body.speed);
    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.width);

    if (this.getData('isShooting')) {
      if (this.getData('timerShootTick') < this.getData('timerShootDelay') ) {
        this.setData('timerShootTick', this.getData('timerShootTick') + 1);
      } else {
        let laser = new PlayerLaser(this.scene, this.x, this.y);
        this.scene.playerLasers.add(laser);
        this.scene.sfx.laser.play();
        this.setData('timerShootTick', 0);
      }
    } 
  }
}