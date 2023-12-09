import eventEmitter from '../../../modules/event-emitter';

class OpponentTypePage {
  constructor(container) {
    this.container = container;
    this.element = this.render();
  }

  render() {
    let element = document.createElement('div');
    element.textContent = 'How many players';

    let players1Btn = document.createElement('button');
    players1Btn.textContent = '1 Player';
    players1Btn.addEventListener('click', () => {
      eventEmitter.emit('gameSetupViewChange', 'nameInput');
      eventEmitter.emit('opponentSelected', '1p');
    });

    let players2Btn = document.createElement('button');
    players2Btn.textContent = '2 Players';
    players2Btn.addEventListener('click', () => {
      eventEmitter.emit('gameSetupViewChange', 'nameInput');
      eventEmitter.emit('opponentSelected', '2p');
    });

    element.appendChild(players1Btn);
    element.appendChild(players2Btn);
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

export default OpponentTypePage;
