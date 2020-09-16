import 'phaser';
import Entity from './Entity';

export default class Asteroid extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'asteroid', 'Asteroid');

    this.body.angularVelocity = Phaser.Math.Between(5, 10);
  }
}