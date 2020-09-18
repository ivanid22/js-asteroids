import axios from 'axios';
import scoresApiData from '../config/scoresApiConfig';

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
    if (a.score > b.score) return -1;
    if (b.score < a.score) return 1;
    return 0;
  });

  const trimScores = (scores) => {
    const trimmedScores = [];
    scores.forEach(s => {
      if ((s.score >= 0) && (s.user.length > 0)) trimmedScores.push(s);
    });
    return trimmedScores;
  };

  const topScores = (count, scores) => {
    let ts = sortScores(scores);
    ts = trimScores(ts);
    if (ts.length > count) ts = ts.splice(count, ts.length - count);
    return ts;
  };

  const postScore = (user, score) => new Promise((resolve, reject) => {
    const requestUrl = `${API_URL}/games/${GAME_ID}/scores/`;
    axios.post(requestUrl, { user, score }).then((response) => {
      resolve(response.data.result);
    }).catch((error) => {
      reject(error);
    });
  });

  return {
    getScores,
    sortScores,
    postScore,
    trimScores,
    topScores,
  };
})();

export default ScoreApi;