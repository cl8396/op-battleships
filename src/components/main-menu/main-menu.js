import eventEmitter from '../../modules/event-emitter';
import './main-menu.css';
import GameSetupMenu from '../game-setup-menu/game-setup-menu';
import Component from '../component';

import { removeAllChildNodes } from '../../helper-functions';

class Menu extends Component {
  constructor(container) {
    super(container);
    this.element = this.#createElement();
    this.currentView = 'main';
    this.main = new MainNavigation(this.element);
    this.gameSetup = new GameSetupMenu(this.element);
    this.main.show();
  }

  #createElement() {
    let element = document.createElement('div');
    element.classList.add('game__main-menu');
    eventEmitter.on('menuChangeView', (view) => {
      this.currentView = view;
      this.update();
    });
    return element;
  }

  update() {
    switch (this.currentView) {
      case 'main':
        this.main.show();
        this.gameSetup.hide();
        break;
      case 'gameSetup':
        this.main.hide();
        this.gameSetup.show();
        break;
    }
  }

  clear() {
    removeAllChildNodes(this.element);
  }
}

class MainNavigation extends Component {
  constructor(container) {
    super(container);
    this.element = this.#createElement();
  }

  #createElement() {
    let element = document.createElement('div');
    let newGameBtn = document.createElement('button');
    newGameBtn.textContent = 'New Game';
    newGameBtn.addEventListener('click', () => {
      eventEmitter.emit('menuChangeView', 'gameSetup');
    });
    element.appendChild(newGameBtn);
    return element;
  }
}

export default Menu;
