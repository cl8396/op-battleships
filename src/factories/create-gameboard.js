import createShip from './create-ship.js';
import eventEmitter from '../modules/event-emitter.js';
function createGameboard() {
  let grid = [];
  let misses = [];
  let ships = [];
  let hits = [];
  let shipsToPlace;

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
    shipsToPlace = [
      { type: 'u-boat', posMap: [0] },
      { type: 'submarine', posMap: [0, -1, 1] },
      { type: 'destroyer', posMap: [0, -1, 1, -2, 2] },
    ];
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

  const placeShip = (startCoords, createShipFn = createShip) => {
    // startCoords = [1, 1]
    let selectedShip = shipsToPlace[0];

    if (!selectedShip) {
      throw new Error('No ship available to place');
    }

    let fullCoordinates = getFullCoordinates(startCoords, selectedShip.posMap);

    if (!fullCoordinates) {
      throw new Error('Not a valid choice');
    }

    let newShip = createShipFn(fullCoordinates.length);
    fullCoordinates.forEach((set) => {
      // set = [1, 1]
      let x = set[0];
      let y = set[1];
      grid[x][y] = newShip;
    });

    shipsToPlace.shift();
    ships.push(newShip);
    eventEmitter.emit('shipPlaced', {
      coordinates: fullCoordinates,
      grid: grid,
    });
    return true;
  };

  const getFullCoordinates = (startCoords, posMap) => {
    let full = posMap.map((offset) => {
      return [startCoords[0], startCoords[1] + offset];
    });
    if (full.every((set) => checkCoordinatesValid(set))) {
      return full;
    }
  };

  const checkCoordinatesValid = (coordinates) => {
    let x = coordinates[0];
    let y = coordinates[1];

    if (!x > 0 || !y > 0) {
      return false;
    }

    // check if ship already at location
    if (grid[x][y]) {
      return false;
    }

    return true;
  };

  const hasAllShipsPlaced = () => {
    if (shipsToPlace.length === 0) {
      return true;
    } else {
      return false;
    }
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
    hasAllShipsPlaced,
    grid,
    misses,
    hits,
  };
}

export default createGameboard;
