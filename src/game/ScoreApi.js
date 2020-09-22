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

  const sortScores = (arry) => {
    const len = arry.length;
    const arr = [...arry];
    for (let i = 0; i < len; i += 1) {
      for (let j = 0; j < len - i - 1; j += 1) {
        if (arr[j].score > arr[j + 1].score) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return [...arr].reverse();
  };

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
    if (ts.length > count) ts.splice(count, ts.length - count);
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