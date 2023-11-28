function createPlayer(createBoard) {
  let gameboard = createBoard();
  const tries = [];

  const takeTurn = (enemy, coordinates) => {
    if (!coordinates) {
      coordinates = generateCoordinates();
      // check if move already played
      if (
        tries.find((set) => {
          return set[0] === coordinates[0] && set[1] === coordinates[1];
        })
      ) {
        takeTurn(enemy);
      }
    }

    enemy.gameboard.recieveAttack(coordinates);
    tries.push(coordinates);
  };

  const generateCoordinates = () => {
    let x = Math.floor(Math.random() * 11);
    let y = Math.floor(Math.random() * 11);
    return [x, y];
  };

  return {
    gameboard,
    tries,
    takeTurn,
  };
}

export default createPlayer;
