import Phaser from 'phaser';
import Entity from './Entity';

export default class AsteroidChunk extends Entity {
  constructor(scene, x, y, key, speedX, speedY) {
    super(scene, x, y, key, 'AsteroidChunk');

    this.body.setAngularVelocity(Phaser.Math.Between(1, 5));
    this.body.setVelocityX(speedX);
    this.body.setVelocityY(speedY);
  }

  goBoom() {
    this.on('animationcomplete', (() => {
      this.destroy();
    }), this);
    this.anims.play('explosionAnimation', true);
  }
}