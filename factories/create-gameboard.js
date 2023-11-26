function createGameboard() {
  let grid = [];
  let misses = [];
  let ships = [];

  for (let i = 0; i <= 10; i++) {
    grid[i] = [];
    for (let j = 0; j <= 10; j++) {
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
    }
  };

  const placeShip = (createShip, coordinates) => {
    // coordinates = [[0, 0]]
    let newShip = createShip(coordinates.length);
    coordinates.forEach((set) => {
      // set = [0, 0]
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

  return { areAllSunk, placeShip, receiveAttack, grid, misses };
}

export default createGameboard;
