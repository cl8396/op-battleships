import Component from '../component';
import eventEmitter from '../../modules/event-emitter';
import './game-status.css';

class GameStatusDisplay extends Component {
  constructor(container) {
    super(container);
    this.element = this.#createElement();
    this.show();
  }

  #createElement() {
    const element = document.createElement('div');
    element.classList.add('game__status-display');

    eventEmitter.on('currentPlayerChange', (currentPlayer) => {
      this.updatePlayer(currentPlayer.name);
    });

    eventEmitter.on('gameOver', (data) => {
      this.handleGameOver(data.winner);
    });

    return element;
  }

  handleGameOver(winner) {
    this.clear();
    this.updateStatus(`Game Over. The winner is ${winner}`);
  }

  updatePlayer(currentPlayer) {
    this.element.textContent = `${currentPlayer}'s turn`;
  }

  updateStatus(status) {
    this.element.textContent = status;
  }

  clear() {
    this.element.textContent = '';
  }

  remove() {
    this.cleanup();
    this.hide();
  }

  cleanup() {
    eventEmitter.off('gameOver', this.handleGameOver);
    eventEmitter.off('currentPlayerChange', this.updatePlayer);
  }
}

export default GameStatusDisplay;
