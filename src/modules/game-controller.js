import createPlayer from '../factories/create-player.js';
import eventEmitter from './event-emitter.js';

class GameController {
  constructor() {
    this.user = null;
    this.opponent = null;
    this.isGameOver = true;
    this.currentPlayer = null;
  }

  newGame() {
    this.isGameOver = false;
    this.user = createPlayer();
    this.opponent = createPlayer({ isAi: true });
    this.populateGameboard(this.user, this.opponent);
    this.currentPlayer = this.user;
  }

  processTurn(coordinates) {
    if (this.isGameOver) {
      throw new Error(`Can't make a move; the game is over.`);
    }

    const otherPlayer = this.getOtherPlayer();
    this.currentPlayer.takeTurn(otherPlayer, coordinates);
    this.currentPlayer = otherPlayer;

    if (this.checkGameOver()) {
      this.endGame();
      return;
    }

    // Make the computer's move
    if (this.currentPlayer.isAi) {
      this.processTurn();
    }
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
  }

  populateGameboard(...players) {
    players.forEach((player) => {
      player.gameboard.placeShip([
        [0, 0],
        [0, 1],
        [0, 2],
      ]);
    });
  }
}

const gameController = new GameController();

export default gameController;
