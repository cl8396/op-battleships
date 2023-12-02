import eventEmitter from './event-emitter';
import GameStatusDisplay from '../components/game-status';

class UI {
  constructor() {
    this.container = document.getElementById('Battleships');
    this.gameStatusDisplay = new GameStatusDisplay(this.container);
  }

  init() {}
}

const ui = new UI();

export default ui;
