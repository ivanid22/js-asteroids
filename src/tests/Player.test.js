import Player from '../game/Player';

const { round, PI } = window.Math;

describe('calcSpeedComponents', () => {
  it('should return the horizontal and vertical velocity components given the speed and an angle', () => {
    const result = Player.calcSpeedComponents(PI / 4, 100);
    result.speedX = round(result.speedX);
    result.speedY = round(result.speedY);
    expect(result).toEqual({ speedX: 71, speedY: 71 });
  });

  it('should return the same results for a given angle and its full rotations', () => {
    const normalResult = Player.calcSpeedComponents(PI / 4, 100);
    const fullRotationResult = Player.calcSpeedComponents((PI / 4) + (2 * PI), 100);
    normalResult.speedX = round(normalResult.speedX);
    normalResult.speedY = round(normalResult.speedY);
    fullRotationResult.speedX = round(fullRotationResult.speedX);
    fullRotationResult.speedY = round(fullRotationResult.speedY);
    expect(normalResult).toEqual(fullRotationResult);
  });

  it('should return a null force on the X axis when movement is vertical', () => {
    const result = Player.calcSpeedComponents(PI / 2, 100);
    result.speedX = round(result.speedX);
    result.speedY = round(result.speedY);
    expect(result.speedX).toEqual(0);
  });

  it('should return a null force on the Y axis when movement is horizontal', () => {
    const result = Player.calcSpeedComponents(PI, 100);
    result.speedX = round(result.speedX);
    result.speedY = round(result.speedY);
    expect(result.speedY).toEqual(0);
  });
});