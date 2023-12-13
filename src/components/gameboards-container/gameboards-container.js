import eventEmitter from '../../modules/event-emitter';
import GameboardComponent from '../gameboard/gameboard';
import { removeAllChildNodes } from '../../helper-functions';

import './gameboards-container.css';

class GameboardsContainer {
  constructor(container) {
    this.container = container;
    this.element = this.render();
    this.userElement = null;
    this.opponentElement = null;

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
  }

  render() {
    const element = document.createElement('div');
    element.classList.add('game__gameboards-container');
    this.container.appendChild(element);
    return element;
  }

  clear() {
    removeAllChildNodes(this.element);
  }
}

export default GameboardsContainer;
