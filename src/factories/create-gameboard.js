import createShip from './create-ship.js';
import eventEmitter from '../modules/event-emitter.js';
function createGameboard() {
  let grid = [];
  let misses = [];
  let ships = [];
  let hits = [];

  const initBoard = () => {
    for (let i = 1; i <= 10; i++) {
      grid[i] = [];
      for (let j = 1; j <= 10; j++) {
        grid[i][j] = null;
      }
    }
    hits = [];
    ships = [];
    misses = [];
  };

  const receiveAttack = (coordinates) => {
    let x = coordinates[0];
    let y = coordinates[1];

    let ship = grid[x][y];

    if (!ship) {
      misses.push(coordinates);
      return false;
    } else {
      ship.hit();
      hits.push(coordinates);
      return true;
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
    eventEmitter.emit('shipPlaced', {
      coordinates: coordinates,
      grid: grid,
    });
  };

  const areAllSunk = () => {
    let aliveShips = ships.filter((ship) => !ship.isSunk());
    return aliveShips.length === 0 ? true : false;
  };

  initBoard();

  return {
    areAllSunk,
    placeShip,
    receiveAttack,
    initBoard,
    grid,
    misses,
    hits,
  };
}

export default createGameboard;
