import eventEmitter from './event-emitter';
import Game from '../components/game/game.js';

class UI {
  constructor() {
    this.container = document.getElementById('Battleships');
    this.game = new Game(this.container);
  }
}

const ui = new UI();

export default ui;
