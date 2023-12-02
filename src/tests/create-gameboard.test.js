import createGameboard from '../factories/create-gameboard';

let gameboard;

// mock functions
let mockCreateShip = jest.fn((length) => {
  return {
    length: length,
    numberOfHits: 0,
    hit() {
      this.numberOfHits++;
    },

    isSunk() {
      return this.numberOfHits >= this.length ? true : false;
    },
  };
});

beforeEach(() => {
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
  let coordinates = [
    [1, 1],
    [1, 2],
  ];

  it('exists', () => {
    expect(gameboard.placeShip).toBeInstanceOf(Function);
  });

  it('calls create ship factory function', () => {
    gameboard.placeShip(coordinates, mockCreateShip);
    expect(mockCreateShip.mock.calls).toHaveLength(1);
  });

  it('places ship at specific coordinates', () => {
    gameboard.placeShip(coordinates, mockCreateShip);
    expect(gameboard.grid[1][1]).toBe(gameboard.grid[1][2]);
    expect(gameboard.grid[1][1].length).toBe(2);
  });
});

describe('receive attack method', () => {
  it('records a miss', () => {
    let coordinates = [1, 1];
    gameboard.receiveAttack(coordinates);
    expect(gameboard.misses).toContain(coordinates);
  });

  it('records a hit', () => {
    let shipLocation = [[2, 1]];
    let targetCoordinate = [2, 1];

    gameboard.placeShip(shipLocation, mockCreateShip);
    gameboard.receiveAttack(targetCoordinate);

    let ship = gameboard.grid[2][1];
    expect(ship.isSunk()).toBe(true);
  });

  it('check all ships are sunk', () => {
    expect(gameboard.areAllSunk()).toBe(true);
    gameboard.placeShip([[1, 1]], mockCreateShip);
    expect(gameboard.areAllSunk()).toBe(false);
  });
});
