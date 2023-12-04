import createPlayer from '../factories/create-player.js';
import eventEmitter from './event-emitter.js';

class GameController {
  constructor() {
    this.user = null;
    this.opponent = null;
    this.isGameOver = true;
    this.currentPlayer = null;
    // must store a reference to timeout to be able to manually clear it if required
    this.computerTimeout = null;

    eventEmitter.on('targetSelected', (data) => {
      if (this.currentPlayer.isAi) {
        return;
      }

      if (data.gameboard === this.getOtherPlayer().gameboard) {
        this.processTurn(data.coordinates);
      }
    });

    eventEmitter.on('newGameRequested', () => this.newGame());
  }

  newGame() {
    this.#clearTimeout();
    this.isGameOver = false;
    this.user = createPlayer('player1');
    this.opponent = createPlayer('computer', { isAi: true });
    this.#populateGameboard(this.user, this.opponent);
    this.currentPlayer = this.user;

    eventEmitter.emit('newGameStarted');
    eventEmitter.emit('currentPlayerChange', {
      currentPlayer: this.currentPlayer.name,
    });
    eventEmitter.emit('playersCreated', {
      user: this.user,
      opponent: this.opponent,
    });
  }

  processTurn(coordinates) {
    if (this.isGameOver) {
      throw new Error(`Can't make a move; the game is over.`);
    }

    const otherPlayer = this.getOtherPlayer();

    try {
      this.currentPlayer.takeTurn(otherPlayer, coordinates);
    } catch (error) {
      console.log(error);
      return;
    }

    if (this.checkGameOver()) {
      this.endGame();
      return;
    }

    this.#toggleCurrentPlayer();

    // Make the computer's move
    if (this.currentPlayer.isAi) {
      // add some 'thinking' time
      this.computerTimeout = setTimeout(() => {
        this.processTurn();
      }, 1500);
    }
  }

  #toggleCurrentPlayer() {
    this.currentPlayer = this.getOtherPlayer();
    eventEmitter.emit('currentPlayerChange', {
      currentPlayer: this.currentPlayer.name,
    });
  }

  getOtherPlayer() {
    return this.currentPlayer === this.user ? this.opponent : this.user;
  }

  checkGameOver() {
    return (
      this.user.gameboard.areAllSunk() || this.opponent.gameboard.areAllSunk()
    );
  }

  endGame() {
    this.isGameOver = true;
    eventEmitter.emit('gameOver', { winner: this.currentPlayer.name });
  }

  #populateGameboard(...players) {
    players.forEach((player) => {
      player.gameboard.placeShip([
        [1, 1],
        [1, 2],
        [1, 3],
      ]);
    });
  }

  #clearTimeout() {
    clearTimeout(this.computerTimeout);
    this.computerTimeout = null;
  }
}

const gameController = new GameController();

export default gameController;
