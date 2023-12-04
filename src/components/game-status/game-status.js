import eventEmitter from '../../modules/event-emitter';
import './game-status.css';

class GameStatusDisplay {
  constructor(container) {
    this.container = container;
    this.element = this.render();

    eventEmitter.on('currentPlayerChange', (data) => {
      this.update(data.currentPlayer);
    });
  }

  render() {
    const element = document.createElement('div');
    element.classList.add('game__status-display');
    this.container.appendChild(element);
    return element;
  }

  update(currentPlayer) {
    this.element.textContent = `${currentPlayer}'s turn`;
  }
}

export default GameStatusDisplay;
