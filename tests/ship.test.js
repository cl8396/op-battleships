import createShip from '../modules/ship';

describe('default, normal behaviour', () => {
  let ship = createShip(1);

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
    }).toThrowError('Invalid length. Must be greater than 0');
  });
});
