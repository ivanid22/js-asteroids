import Phaser from 'phaser';
import ScoreApi from '../game/ScoreApi';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }

  displayFields() {
    const { width, heigth } = this.game.config;
    this.add.text(width / 2, heigth / 2 - 300, 'Congratulations! You got a high score!\nType your name and press enter');
    this.inputField.classList.remove('hidden');
    this.inputField.focus();
  }

  create() {
    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    ScoreApi.getScores().then((scores) => {
      this.finalScore = this.game.globals.finalScore;
      this.inputField = document.getElementById('playerNameTextBox');
      const topScores = ScoreApi.topScores(10, scores);
      if (topScores[9].score < this.finalScore) {
        this.displayFields();
      } else {
        this.scene.start('LeaderboardScene');
      }
    }).catch(() => {
      this.scene.start('TitleScene');
    });
  }

  update() {
    if (this.enterKey.isDown && (this.inputField.nodeValue !== '')) {
      this.game.globals.finalScore = null;
      this.inputField.classList.add('hidden');
      ScoreApi.postScore({
        user: this.inputField.nodeValue,
        score: this.finalScore,
      }).then(() => {
        this.scene.start('LeaderboardScene');
      }).catch(() => {
        this.scene.start('TitleScene');
      });
    }
  }
}