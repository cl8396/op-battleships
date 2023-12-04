import createShip from './create-ship.js';

function createGameboard() {
  let grid = [];
  let misses = [];
  let ships = [];
  let hits = [];

  for (let i = 1; i <= 10; i++) {
    grid[i] = [];
    for (let j = 1; j <= 10; j++) {
      grid[i][j] = null;
    }
  }

  const receiveAttack = (coordinates) => {
    let x = coordinates[0];
    let y = coordinates[1];

    let ship = grid[x][y];

    if (!ship) {
      misses.push(coordinates);
    } else {
      ship.hit();
      hits.push(coordinates);
    }
  };

  const placeShip = (coordinates, createShipFn = createShip) => {
    // coordinates = [[1, 1]]
    let newShip = createShipFn(coordinates.length);
    coordinates.forEach((set) => {
      // set = [1, 1]
      let x = set[0];
      let y = set[1];
      grid[x][y] = newShip;
    });
    ships.push(newShip);
  };

  const areAllSunk = () => {
    let aliveShips = ships.filter((ship) => !ship.isSunk());
    return aliveShips.length === 0 ? true : false;
  };

  return { areAllSunk, placeShip, receiveAttack, grid, misses, hits };
}

export default createGameboard;
