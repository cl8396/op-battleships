import createGameboard from './create-gameboard.js';
import eventEmitter from '../modules/event-emitter.js';

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
    }

    enemy.gameboard.receiveAttack(coordinates);

    eventEmitter.emit('gameboardChange', {
      coordinates: coordinates,
      gameboard: enemy.gameboard,
    });
    tries.push(coordinates);
  };

  const generateCoordinates = () => {
    let x = Math.floor(Math.random() * 10) + 1;
    let y = Math.floor(Math.random() * 10) + 1;

    // check if move already played
    if (
      tries.find((set) => {
        return set[0] === x && set[1] === y;
      })
    ) {
      return generateCoordinates();
    }

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
