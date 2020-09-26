import 'phaser';
import Entity from './Entity';
import Player from './Player';

export default class Laser extends Entity {
  constructor(scene, x, y, key, speed, angle) {
    super(scene, x, y, key, 'Laser');

    const { speedX, speedY } = Player.calcSpeedComponents(angle, speed);
    this.body.angle = angle;
    this.rotation = angle - (Math.PI / 2);
    this.body.setVelocityX(speedX);
    this.body.setVelocityY(speedY);
  }

  update() {
    const camera = this.scene.cameras.main;
    if (this.y > (camera.midPoint.y + camera.height / 2)
        || this.y < (camera.midPoint.y - camera.height / 2)
        || this.x > (camera.midPoint.x + camera.width / 2)
        || this.x < (camera.midPoint.x - camera.width / 2)) {
      this.destroy();
    }
  }
}