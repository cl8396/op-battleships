import createGameboard from '../factories/create-gameboard';

let gameboard;
beforeAll(() => {
  gameboard = createGameboard();
});

describe('default, normal behaviour', () => {
  beforeEach(() => {
    gameboard = createGameboard();
  });

  it('should be an object', () => {
    expect(gameboard).toEqual(expect.any(Object));
  });
});

describe('place ship method', () => {
  let mockCreateShip = jest.fn(() => {
    return {};
  });

  let coordinates = [
    [0, 0],
    [0, 1],
  ];

  it('exists', () => {
    expect(gameboard.placeShip).toBeInstanceOf(Function);
  });

  it('calls create ship factory function', () => {
    gameboard.placeShip(mockCreateShip, coordinates);
    expect(mockCreateShip.mock.calls).toHaveLength(1);
  });

  it('places ship at specific coordinates', () => {
    gameboard.placeShip(mockCreateShip, coordinates);
    expect(gameboard.grid[0][0]).toEqual(mockCreateShip());
    expect(gameboard.grid[0][1]).toEqual(mockCreateShip());
  });
});
