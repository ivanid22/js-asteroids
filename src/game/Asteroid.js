import Phaser from 'phaser';
import Entity from './Entity';

export default class Asteroid extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'asteroid', 'Asteroid');

    this.body.angularVelocity = Phaser.Math.Between(5, 10);
    this.body.setVelocityX(Phaser.Math.Between(-10, 10));
    this.body.setVelocityY(Phaser.Math.Between(-10, 10));
  }

  goBoom() {
    this.on('animationcomplete', (() => {
      this.destroy();
    }), this);
    this.anims.play('explosionAnimation', true);
  }
}