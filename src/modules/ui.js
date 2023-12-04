import eventEmitter from './event-emitter';
import GameStatusDisplay from '../components/game-status/game-status.js';
import GameboardsContainer from '../components/gameboards-container/gameboards-container';
import GameboardComponent from '../components/gameboard/gameboard';

class UI {
  constructor() {
    this.container = document.getElementById('Battleships');
    this.gameStatusDisplay = new GameStatusDisplay(this.container);
    this.gameboardsContainer = new GameboardsContainer(this.container);
  }
}

const ui = new UI();

export default ui;
