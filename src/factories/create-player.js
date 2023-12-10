import createGameboard from './create-gameboard.js';
import eventEmitter from '../modules/event-emitter.js';

function createPlayer(playerName, options = {}) {
  let gameboard;
  let name = playerName;
  const tries = [];
  const isAi = options.isAi || false;

  if (options.createGameboard) {
    gameboard = options.createGameboard();
  } else {
    gameboard = createGameboard();
  }

  const reset = () => {
    tries.length = 0;
    gameboard.initBoard();
  };

  const takeTurn = (enemy, coordinates) => {
    if (!coordinates) {
      coordinates = generateCoordinates();
    }

    if (checkIfTried(coordinates)) {
      throw new Error('This location has already been hit!');
    }

    const isHit = enemy.gameboard.receiveAttack(coordinates);

    if (isHit) {
      eventEmitter.emit('tileHit', {
        coordinates: coordinates,
        gameboard: enemy.gameboard,
      });
    } else {
      eventEmitter.emit('tileMissed', {
        coordinates: coordinates,
        gameboard: enemy.gameboard,
      });
    }
    tries.push(coordinates);
  };

  const checkIfTried = (coordinates) => {
    let x = coordinates[0];
    let y = coordinates[1];

    if (
      tries.find((set) => {
        return set[0] === x && set[1] === y;
      })
    ) {
      return true;
    } else {
      return false;
    }
  };

  const generateCoordinates = () => {
    let x = Math.floor(Math.random() * 10) + 1;
    let y = Math.floor(Math.random() * 10) + 1;

    // check if move already played
    if (checkIfTried([x, y])) {
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
    reset,
  };
}

export default createPlayer;
