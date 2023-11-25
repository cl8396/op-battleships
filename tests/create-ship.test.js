import createShip from '../factories/create-ship';

describe('default, normal behaviour', () => {
  let ship;

  beforeEach(() => {
    ship = createShip(1);
  });

  it('should be an object', () => {
    expect(ship).toEqual(expect.any(Object));
  });

  it('has method to check whether sunk or not', () => {
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});

describe('bad length value', () => {
  it('should throw an error when length <= 0', () => {
    expect(() => {
      return createShip(0);
    }).toThrow('Invalid length. Must be greater than 0');
  });
});
