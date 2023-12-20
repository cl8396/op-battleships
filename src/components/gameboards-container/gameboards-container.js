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
    this.userElement = null;
    this.opponentElement = null;
  }

  #createElement() {
    const element = document.createElement('div');
    element.classList.add('game__gameboards-container');

    // create a new gameboard component for the player
    eventEmitter.on('userCreated', (user) => {
      // remove any previous gameboard component
      if (this.userElement) {
        this.userElement.hide();
      }
      this.userElement = new GameboardComponent(this.element, user);
    });

    // create a new gameboard component for the player
    eventEmitter.on('opponentCreated', (opponent) => {
      // remove any previous gameboard component
      if (this.opponentElement) {
        this.opponentElement.hide();
      }
      this.opponentElement = new GameboardComponent(this.element, opponent);
    });

    return element;
  }

  clear() {
    removeAllChildNodes(this.element);
  }
}

export default GameboardsContainer;
