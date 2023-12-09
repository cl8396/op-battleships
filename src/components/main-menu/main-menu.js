import eventEmitter from '../../modules/event-emitter';
import './main-menu.css';
import GameSetupMenu from '../game-setup-menu/game-setup-menu';

import { removeAllChildNodes } from '../../helper-functions';

class Menu {
  constructor(container) {
    this.container = container;
    this.element = this.render();
    this.currentView = 'main';
    this.main = new MainNavigation(this.element);
    this.gameSetup = new GameSetupMenu(this.element);

    this.gameSetup.hide();

    eventEmitter.on('menuChangeView', (view) => {
      this.currentView = view;
      this.update();
    });
  }

  render() {
    let element = document.createElement('div');
    element.classList.add('game__main-menu');

    this.container.appendChild(element);
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

  show() {
    this.container.appendChild(this.element);
  }

  hide() {
    this.container.removeChild(this.element);
  }
}

class MainNavigation {
  constructor(container) {
    this.container = container;
    this.element = this.render();
  }

  render() {
    let element = document.createElement('div');
    let newGameBtn = document.createElement('button');
    newGameBtn.textContent = 'New Game';
    newGameBtn.addEventListener('click', () => {
      eventEmitter.emit('menuChangeView', 'gameSetup');
    });
    element.appendChild(newGameBtn);
    this.container.appendChild(element);
    return element;
  }

  show() {
    this.container.appendChild(this.element);
  }

  hide() {
    this.container.removeChild(this.element);
  }
}

export default Menu;
