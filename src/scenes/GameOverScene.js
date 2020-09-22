import Phaser from 'phaser';
import ScoreApi from '../game/ScoreApi';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }

  displayFields() {
    const { width, height } = this.game.config;
    const displayZone = this.add.zone(width / 2, height / 2, width, height);
    const headerText = this.add.text(1, 1, 'Congratulations! You got a high score!\nType your name and press enter', { fontSize: 20 });
    Phaser.Display.Align.In.Center(headerText, displayZone, 0, -200);
    this.inputField.classList.remove('hidden');
    this.inputField.focus();
  }

  create() {
    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.scoreWasSent = false;
    ScoreApi.getScores().then((scores) => {
      this.finalScore = this.game.globals.finalScore;
      this.inputField = document.getElementById('playerNameTextBox');
      const topScores = ScoreApi.topScores(10, scores);
      if (topScores[topScores.length - 1].score < this.finalScore) {
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
      this.input.keyboard.removeAllListeners();
      if (!this.scoreWasSent) {
        ScoreApi.postScore(this.inputField.value, this.finalScore).then(() => {
          this.scene.start('LeaderboardScene');
        }).catch(() => {
          this.scene.start('TitleScene');
        });
      }
      this.scoreWasSent = true;
    }
  }
}