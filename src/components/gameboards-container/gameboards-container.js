import eventEmitter from '../../modules/event-emitter';
import GameboardComponent from '../gameboard/gameboard';
import { removeAllChildNodes } from '../../helper-functions';

import './gameboards-container.css';

class GameboardsContainer {
  constructor(container) {
    this.container = container;
    this.element = this.render();

    eventEmitter.on('playersCreated', (players) => {
      this.clear();
      this.createGameboards(players);
    });
  }

  render() {
    const element = document.createElement('div');
    element.classList.add('game__gameboards-container');
    this.container.appendChild(element);
    return element;
  }

  createGameboards(players) {
    // create and render UI gameboard components representing each player's boards
    for (const key in players) {
      let player = players[key];
      let gameboard = new GameboardComponent(this.element, player);
    }
  }

  clear() {
    removeAllChildNodes(this.element);
  }
}

export default GameboardsContainer;
