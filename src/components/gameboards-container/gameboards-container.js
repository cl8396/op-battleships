import eventEmitter from '../../modules/event-emitter';
import GameboardComponent from '../gameboard/gameboard';
import { removeAllChildNodes } from '../../helper-functions';
import './gameboards-container.css';
import Component from '../component';

class GameboardsContainer extends Component {
  constructor(container) {
    super(container);
    this.element = this.#createElement();
    this.show();
  }

  #createElement() {
    const element = document.createElement('div');
    element.classList.add('game__gameboards-container');

    eventEmitter.on('newGameStarted', (players) => {
      // create new gameboard components for each player
      this.clear();
      players.forEach((player) => {
        new GameboardComponent(this.element, player);
      });
    });

    eventEmitter.on('placeShipsPhaseStarted', (currentPlayer) => {
      this.clear();
      new GameboardComponent(this.element, currentPlayer);
    });
    return element;
  }

  clear() {
    removeAllChildNodes(this.element);
  }
}

export default GameboardsContainer;
