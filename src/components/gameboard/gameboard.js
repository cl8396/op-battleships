import eventEmitter from '../../modules/event-emitter';
import './gameboard.css';

class GameboardComponent {
  constructor(container) {
    this.container = container;
    this.element = this.render();
  }

  render() {
    const element = document.createElement('div');
    element.classList.add('game__gameboard');
    this.container.appendChild(element);
    return element;
  }

  update() {}
}

export default GameboardComponent;
