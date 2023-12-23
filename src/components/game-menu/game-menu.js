import Component from '../component.js';
import eventEmitter from '../../modules/event-emitter';
import './game-menu.css';

class GameMenu extends Component {
  constructor(container) {
    super(container);
    this.element = this.#createElement();
    this.show();
  }

  #createElement() {
    const element = document.createElement('div');
    element.classList.add('game__menu');
    element.textContent = 'game menu';

    const newGameBtn = document.createElement('button');
    newGameBtn.textContent = 'New Game';
    newGameBtn.addEventListener('click', () => {
      eventEmitter.emit('newGameRequested');
    });
    element.appendChild(newGameBtn);

    let mainMenuBtn = document.createElement('button');
    mainMenuBtn.textContent = 'Main Menu';
    mainMenuBtn.addEventListener('click', () => {
      eventEmitter.emit('menuChangeView', 'main');
      eventEmitter.emit('openMainMenu');
    });

    let toggleShipRotationBtn = document.createElement('button');
    toggleShipRotationBtn.textContent = 'Rotate Ship';
    toggleShipRotationBtn.addEventListener('click', () => {
      eventEmitter.emit('requestToggleShipRotation');
    });

    element.appendChild(mainMenuBtn);
    element.appendChild(toggleShipRotationBtn);
    return element;
  }
}

export default GameMenu;
