import createGameboard from '../modules/create-gameboard';

describe('default, normal behaviour', () => {
  let gameboard = createGameboard();

  it('should be an object', () => {
    expect(gameboard).toEqual(expect.any(Object));
  });
});
