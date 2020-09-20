import ScoreApi from '../game/ScoreApi';

const testScores = [
  {
    user: 'first',
    score: 10,
  },
  {
    user: 'second',
    score: 20,
  },
  {
    user: 'third',
    score: 30,
  },
  {
    user: 'fourth',
    score: 40,
  },
  {
    user: 'fifth',
    score: 50,
  },
];

describe('ScoreApi', () => {
  describe('getScores', () => {
    it('should retrieve score data from remote API', () => ScoreApi.getScores().then((scores) => {
      expect(scores.length).toBeGreaterThan(0);
    }));
  });

  describe('sortScores', () => {
    it('should sort scores by value', () => {
      const unsortedScores = [
        { score: 10, user: 'test1' },
        { score: 5, user: 'test2' },
        { score: 20, user: 'test3' },
      ];

      expect(ScoreApi.sortScores(unsortedScores)).toEqual([
        { score: 20, user: 'test3' },
        { score: 10, user: 'test1' },
        { score: 5, user: 'test2' },
      ]);
    });
  });

  describe('postScore', () => {
    it('should send a score to the API', () => ScoreApi.postScore('test', -1).then((response) => {
      expect(response).toEqual('Leaderboard score created correctly.');
    }));
  });

  describe('trimScores', () => {
    it('should trim negative and empty user scores', () => {
      const scores = [
        { user: 'test1', score: -1 },
        { user: '', score: 10 },
        { user: 'test2', score: 20 },
      ];
      expect(ScoreApi.trimScores(scores)).toEqual([{ user: 'test2', score: 20 }]);
    });
  });

  describe('topScores', () => {
    it('should return top scores from the given array', () => {
      expect(ScoreApi.topScores(3, testScores)).toEqual([
        {
          user: 'fifth',
          score: 50,
        },
        {
          user: 'fourth',
          score: 40,
        },
        {
          user: 'third',
          score: 30,
        },
      ]);
    });
  });
});