import 'phaser';
import axios from 'axios';
import { scoresApiData } from '../config/config';

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super('LeaderboardScene');
  }

  fetchApiData() {
    const {API_URL, GAME_ID} = scoresApiData;
    const requestUrl = `${API_URL}/games/${GAME_ID}/scores/`;
    axios.get(requestUrl).then((response) => {
      console.log(response.data.result);
      this.displayLeaderboardData(response.data.result)
    }).catch((error) => {
      console.log(error.message);
    });
  }

  displayLeaderboardData(data) {
    let displayStr = '';
    data.forEach(entry => {
      displayStr += `\n${entry.user}: ${entry.score}`;
    });
    this.scores = this.add.text(1, 1, displayStr, { lineSpacing: 20 });
    Phaser.Display.Align.In.Center(this.scores, this.textZone, 0, -200);
  }

  create() {
    const { width, height, x, y } = this.game.config;
    this.add.image(width / 2, height / 2, 'gameBg');
    this.textZone = this.add.zone(width / 2, height / 2, width, height);
    this.fetchApiData();
  }
}