import eventEmitter from '../modules/event-emitter';

class GameStatusDisplay {
  constructor(container) {
    this.container = container;
    this.element = this.render();

    eventEmitter.on('currentPlayerChange', (data) => {
      this.updateStatus(data.currentPlayer);
    });
  }

  render() {
    console.log('render called');
    const element = document.createElement('div');
    element.classList.add('game__status-display');
    this.container.appendChild(element);
    return element;
  }

  updateStatus(currentPlayer) {
    console.log('update called');
    console.log(currentPlayer);
    this.element.textContent = currentPlayer;
  }
}

export default GameStatusDisplay;
