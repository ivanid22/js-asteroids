export default class ScoreTracker {
  constructor(scoreTable) {
    this.currentScore = 0;
    this.scoreTable = {};
    scoreTable.forEach(scoreEntry => {
      this.scoreTable[scoreEntry.name] = scoreEntry.value;
    });
  }

  getScore() {
    return this.currentScore;
  }

  increaseScore(scoreName) {
    if (this.scoreTable[scoreName]) this.currentScore += this.scoreTable[scoreName];
  }

  resetScore() {
    this.currentScore = 0;
  }

  keyExists(key) {
    if (this.scoreTable[key]) return true;
    return false;
  }

  getScoreTable() {
    return this.scoreTable;
  }
}