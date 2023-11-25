function createGameboard() {
  let grid = [];

  for (let i = 0; i <= 10; i++) {
    grid[i] = [];
    for (let j = 0; j <= 10; j++) {
      grid[i][j] = 'hello';
    }
  }

  const placeShip = (createShip, coordinates) => {
    // coordinates = [[0, 0]]
    let newShip = createShip();
    coordinates.forEach((set) => {
      // set = [0, 0]
      let x = set[0];
      let y = set[1];
      grid[x][y] = newShip;
    });
  };

  return { placeShip, grid };
}

export default createGameboard;
