import eventEmitter from '../../modules/event-emitter';
import OpponentTypePage from './views/opponent-type-page';
import PlayerNames from './views/player-name-page';

class GameSetupMenu {
  constructor(container) {
    this.container = container;
    this.element = this.render();
    this.opponentType = new OpponentTypePage(this.element);
    this.playerNames = new PlayerNames(this.element);

    this.playerNames.hide();
  }

  render() {
    let element = document.createElement('div');
    element.textContent = 'GAME SETUP MENU';

    let backBtn = document.createElement('button');
    backBtn.textContent = 'Back';
    backBtn.addEventListener('click', () => {
      eventEmitter.emit('menuChangeView', 'main');
    });

    element.appendChild(backBtn);
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

export default GameSetupMenu;
