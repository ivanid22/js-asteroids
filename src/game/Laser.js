import 'phaser';
import Entity from './Entity';
import Player from './Player';

export default class Laser extends Entity {
  constructor(scene, x, y, key, speed, angle) {
    super(scene, x, y, key, 'Laser');

    const { speedX, speedY } = Player.calcSpeedComponents(angle, speed);
    this.body.angle = angle;
    this.body.setVelocityX(speedX);
    this.body.setVelocityY(speedY);
  }
}