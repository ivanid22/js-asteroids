import 'phaser';
import config from '../config/config';
import GameScene from '../scenes/GameScene';
import PreloadScene from '../scenes/Preload';
import gameGlobals from '../config/gameGlobals';

export default class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.globals = gameGlobals;
    this.scene.add('Preload', PreloadScene);
    this.scene.add('GameScene', GameScene);
    this.scene.start('Preload');
  }
}