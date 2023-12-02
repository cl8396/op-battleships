import createGameboard from './create-gameboard.js';

function createPlayer(name, options = {}) {
  let gameboard;

  if (options.createGameboard) {
    gameboard = options.createGameboard();
  } else {
    gameboard = createGameboard();
  }
  const tries = [];
  const isAi = options.isAi || false;

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

    enemy.gameboard.receiveAttack(coordinates);
    tries.push(coordinates);
  };

  const generateCoordinates = () => {
    let x = Math.floor(Math.random() * 11);
    let y = Math.floor(Math.random() * 11);
    return [x, y];
  };

  return {
    name,
    gameboard,
    tries,
    isAi,
    takeTurn,
  };
}

export default createPlayer;
