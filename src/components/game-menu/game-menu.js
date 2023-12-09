import eventEmitter from '../../modules/event-emitter';
import './game-menu.css';

class GameMenu {
  constructor(container) {
    this.container = container;
    this.element = this.render();
  }

  render() {
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
    element.appendChild(mainMenuBtn);

    this.container.appendChild(element);
    return element;
  }
}

export default GameMenu;
