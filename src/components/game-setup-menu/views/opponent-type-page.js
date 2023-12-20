import eventEmitter from '../../../modules/event-emitter';
import Component from '../../component';

class OpponentTypePage extends Component {
  constructor(container) {
    super(container);
    this.element = this.#createElement();
  }

  #createElement() {
    let element = document.createElement('div');
    element.textContent = 'How many players';

    let players1Btn = document.createElement('button');
    players1Btn.textContent = '1 Player';
    players1Btn.addEventListener('click', () => {
      eventEmitter.emit('opponentSelected', 1);
      eventEmitter.emit('createOpponentRequested', {
        name: 'Computer',
        isAi: true,
      });
      eventEmitter.emit('gameSetupViewChange', 'nameInput');
    });

    let players2Btn = document.createElement('button');
    players2Btn.textContent = '2 Players';
    players2Btn.addEventListener('click', () => {
      eventEmitter.emit('opponentSelected', 2);
      eventEmitter.emit('gameSetupViewChange', 'nameInput');
    });

    element.appendChild(players1Btn);
    element.appendChild(players2Btn);
    return element;
  }
}

export default OpponentTypePage;
