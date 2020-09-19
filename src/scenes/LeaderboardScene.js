import Phaser from 'phaser';
import Button from '../controls/Button';
import ScoreApi from '../game/ScoreApi';

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super('LeaderboardScene');
  }

  displayLeaderboardData(data) {
    let displayStr = '';
    data.forEach(entry => {
      displayStr += `\n${entry.user}: ${entry.score}`;
    });
    this.header = this.add.text(1, 1, 'Top 10 Leaderboard', { fontSize: 40 });
    this.scores = this.add.text(1, 1, displayStr, { lineSpacing: 20 });
    Phaser.Display.Align.In.Center(this.header, this.textZone, 0, -250);
    Phaser.Display.Align.In.Center(this.scores, this.textZone, 0);
  }

  create() {
    const { width, height } = this.game.config;
    this.add.image(width / 2, height / 2, 'gameBg');
    this.textZone = this.add.zone(width / 2, height / 2, width, height);
    this.menuButton = new Button(this, width / 2, height - 100, 'blueButton1', 'blueButton2', 'Menu', 'TitleScene');
    ScoreApi.getScores().then((scores) => {
      const finalScores = ScoreApi.topScores(10, scores);
      this.displayLeaderboardData(finalScores);
    }).catch(() => {
      const err = this.add.text(1, 1, 'There was a problem connecting to the Leaderboard API!');
      Phaser.Display.Align.In.Center(err, this.textZone);
    });
  }
}