import Component from '../component';
import eventEmitter from '../../modules/event-emitter';
import OpponentTypePage from './views/opponent-type-page';
import PlayerNames from './views/player-name-page';

class GameSetupMenu extends Component {
  constructor(container) {
    super(container);
    this.element = this.#createElement();
    this.opponentType = new OpponentTypePage(this.element);
    this.playerNames = new PlayerNames(this.element);
    this.opponentType.show();
  }

  #createElement() {
    let element = document.createElement('div');
    element.textContent = 'GAME SETUP MENU';

    let backBtn = document.createElement('button');
    backBtn.textContent = 'Back';
    backBtn.addEventListener('click', () => {
      eventEmitter.emit('menuChangeView', 'main');
    });

    element.appendChild(backBtn);

    eventEmitter.on('gameSetupViewChange', (newView) => {
      this.handleGameSetupViewChange(newView);
    });

    return element;
  }

  handleGameSetupViewChange(newView) {
    switch (newView) {
      case 'opponentType':
        this.playerNames.hide();
        this.opponentType.show();
        break;
      case 'nameInput':
        this.playerNames.show();
        this.opponentType.hide();
        break;
    }
  }

  cleanup() {
    eventEmitter.off('gameSetupViewChange', this.handleGameSetupViewChange);
  }

  remove() {
    this.cleanup();
    this.hide();
  }
}

export default GameSetupMenu;
