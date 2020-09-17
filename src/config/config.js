import "phaser";

export default {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
};

export const scoresApiData = {
  API_URL: 'https://us-central1-js-capstone-backend.cloudfunctions.net/api',
  GAME_ID: '9vlDs6BmcqwmKCezgb9l'
};
