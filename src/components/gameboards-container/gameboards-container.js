import eventEmitter from '../../modules/event-emitter';
import GameboardComponent from '../gameboard/gameboard';
import { removeAllChildNodes } from '../../helper-functions';

import './gameboards-container.css';

class GameboardsContainer {
  constructor(container) {
    this.container = container;
    this.element = this.render();

    eventEmitter.on('playersCreated', (players) => {
      this.depopulate();
      this.populate(players);
    });
  }

  render() {
    const element = document.createElement('div');
    element.classList.add('game__gameboards-container');
    this.container.appendChild(element);
    return element;
  }

  populate(players) {
    // create and render UI gameboard components representing each player's boards
    for (const key in players) {
      let player = players[key];
      let container = document.createElement('div');
      let header = document.createElement('header');
      header.textContent = player.name;
      container.appendChild(header);
      let gameboard = new GameboardComponent(container, player.gameboard);
      this.element.appendChild(container);
    }
  }

  depopulate() {
    removeAllChildNodes(this.element);
  }
}

export default GameboardsContainer;
