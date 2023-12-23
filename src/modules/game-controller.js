import createPlayer from '../factories/create-player.js';
import eventEmitter from './event-emitter.js';

class GameController {
  constructor() {
    this.user = null;
    this.opponent = null;
    this.isGameOver = true;
    this.isPlaceShipsPhase = true;
    this.currentPlayer = null;
    // must store a reference to timeout to be able to manually clear it if required
    this.computerTimeout = null;

    eventEmitter.on('tileClicked', (data) => {
      this.handleTileClick(data);
    });

    eventEmitter.on('createUserRequested', (name) => {
      this.user = createPlayer(name);
    });

    eventEmitter.on('createOpponentRequested', (data) => {
      if (data.isAi) {
        this.opponent = createPlayer(data.name, { isAi: data.isAi });
      } else {
        this.opponent = createPlayer(data.name);
      }
    });

    eventEmitter.on('requestToggleShipRotation', () => {
      this.currentPlayer.gameboard.toggleShipRotation();
    });

    eventEmitter.on('newGameRequested', () => this.newGame());
  }

  handleTileClick(data) {
    if (this.isPlaceShipsPhase) {
      this.requestPlaceShip(data);
      return;
    }

    if (this.currentPlayer.isAi) {
      return;
    }

    if (data.gameboard === this.getOtherPlayer().gameboard) {
      this.processTurn(data.coordinates);
      return;
    }
  }

  requestPlaceShip(data) {
    let startCoords = data.coordinates;

    if (!data.gameboard === this.currentPlayer.gameboard) {
      return;
    }

    // let selectedShip = this.currentPlayer.gameboard.selectedShip;

    // if (!selectedShip) {
    //   throw new Error('No ship currently selected');
    // }

    this.currentPlayer.gameboard.placeShip(startCoords);

    if (this.checkAllShipsPlaced() === true) {
      console.log('place ships phase over');
      this.isPlaceShipsPhase = false;
      eventEmitter.emit('newGameStarted', [this.user, this.opponent]);
    }
  }

  checkAllShipsPlaced() {
    if (
      this.user.gameboard.hasAllShipsPlaced() &&
      this.opponent.gameboard.hasAllShipsPlaced()
    ) {
      return true;
    } else {
      return false;
    }
  }

  newGame() {
    this.#clearTimeout();
    this.isGameOver = false;

    this.#resetPlayers(this.user, this.opponent);
    // add ships to each gameboard
    // this.#populateGameboard(this.user, this.opponent);

    this.currentPlayer = this.user;
    eventEmitter.emit('currentPlayerChange', this.currentPlayer);

    this.placeShipsPhaseStart();
    // hide menu and show game
    // eventEmitter.emit('newGameStarted', [this.user, this.opponent]);
  }

  placeShipsPhaseStart() {
    this.isPlaceShipsPhase = true;
    eventEmitter.emit('placeShipsPhaseStarted', this.currentPlayer);
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
    eventEmitter.emit('currentPlayerChange', this.currentPlayer);
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
    this.#clearTimeout();
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

  #resetPlayers(...players) {
    players.forEach((player) => {
      player.reset();
    });
  }

  #clearTimeout() {
    clearTimeout(this.computerTimeout);
    this.computerTimeout = null;
  }
}

const gameController = new GameController();

export default gameController;
