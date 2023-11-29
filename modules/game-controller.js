import createPlayer from '../factories/create-player.js';

const gameController = {
  user: null,
  opponent: null,
  isGameOver: true,
  currentPlayer: null,

  newGame() {
    this.isGameOver = false;
    this.user = createPlayer();
    this.opponent = createPlayer({ isAi: true });
    this.populateGameboard(this.user, this.opponent);
    this.currentPlayer = this.user;
  },

  processTurn(coordinates) {
    if (this.isGameOver) {
      throw new Error(`Can't make move, game is over.`);
    }

    let otherPlayer = this.getOtherPlayer();
    this.currentPlayer.takeTurn(otherPlayer, coordinates);
    this.currentPlayer = otherPlayer;

    if (this.checkGameOver()) {
      this.endGame();
      return;
    }
    // make the computer's move
    if (this.currentPlayer.isAi) {
      this.processTurn();
    }
  },

  getOtherPlayer() {
    if (this.currentPlayer === this.user) {
      return this.opponent;
    } else {
      return this.user;
    }
  },

  checkGameOver() {
    if (
      this.user.gameboard.areAllSunk() === true ||
      this.opponent.gameboard.areAllSunk() === true
    ) {
      return true;
    } else {
      return false;
    }
  },

  endGame() {
    this.isGameOver = true;
  },

  populateGameboard(...players) {
    players.forEach((player) => {
      player.gameboard.placeShip([
        [0, 0],
        [0, 1],
        [0, 2],
      ]);
    });
  },
};

export default gameController;
