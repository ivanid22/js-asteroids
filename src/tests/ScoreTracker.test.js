import ScoreTracker from '../game/ScoreTracker';

let scoreTracker;

describe('ScoreTracker', () => {
  beforeEach(() => {
    scoreTracker = new ScoreTracker([
      {
        name: 'first',
        value: 10,
      },
      {
        name: 'second',
        value: 20,
      },
    ]);
  });

  describe('getScore', () => {
    it('should return the current score', () => {
      expect(scoreTracker.getScore()).toEqual(0);
    });
  });

  describe('increaseScore', () => {
    it('should increase the current score given the key', () => {
      scoreTracker.increaseScore('first');
      scoreTracker.increaseScore('second');
      expect(scoreTracker.getScore()).toEqual(30);
    });

    it('should ignore score counts when key passed is not registered', () => {
      scoreTracker.increaseScore('first');
      scoreTracker.increaseScore('second');
      scoreTracker.increaseScore('unregistered');
      expect(scoreTracker.getScore()).toEqual(30);
    });
  });

  describe('keyExists', () => {
    it('should return true for registered score keys', () => {
      expect(scoreTracker.keyExists('first')).toEqual(true);
    });

    it('should return false for unregistered score keys', () => {
      expect(scoreTracker.keyExists('unregistered')).toEqual(false);
    });
  });

  describe('resetScore', () => {
    it('should reset the current score', () => {
      scoreTracker.increaseScore('second');
      scoreTracker.resetScore();
      expect(scoreTracker.getScore()).toEqual(0);
    });
  });

  describe('getScoreTable', () => {
    it('should return a table with registered score values', () => {
      expect(scoreTracker.getScoreTable()).toEqual({
        first: 10,
        second: 20,
      });
    });
  });
});
