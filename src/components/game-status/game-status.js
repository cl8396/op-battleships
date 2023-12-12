import eventEmitter from '../../modules/event-emitter';
import { removeAllChildNodes } from '../../helper-functions';
import './game-status.css';

class GameStatusDisplay {
  constructor(container) {
    this.container = container;
    this.element = this.render();

    eventEmitter.on('currentPlayerChange', (currentPlayer) => {
      this.updatePlayer(currentPlayer.name);
    });

    eventEmitter.on('gameOver', (data) => {
      this.clear();
      this.updateStatus(`Game Over. The winner is ${data.winner}`);
    });
  }

  render() {
    const element = document.createElement('div');
    element.classList.add('game__status-display');
    this.container.appendChild(element);
    return element;
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
}

export default GameStatusDisplay;
