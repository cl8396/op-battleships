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
      eventEmitter.emit('opponentSelected', 1);
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
