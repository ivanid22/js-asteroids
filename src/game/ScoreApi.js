import axios from 'axios';
import { scoresApiData } from '../config/config';

const ScoreApi = (() => {
  const { API_URL, GAME_ID } = scoresApiData;

  const getScores = () => new Promise((resolve, reject) => {
    const requestUrl = `${API_URL}/games/${GAME_ID}/scores/`;
    axios.get(requestUrl).then((response) => {
      resolve(response.data.result);
    }).catch((error) => {
      reject(error.message);
    });
  });

  const sortScores = (scores) => scores.sort((a, b) => {
    if (a.score < b.score) return -1;
    if (b.score < a.score) return 1;
    return 0;
  });

  return {
    getScores,
    sortScores,
  };
})();

export default ScoreApi;