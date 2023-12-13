import eventEmitter from '../../../modules/event-emitter';
import { removeAllChildNodes } from '../../../helper-functions';

class PlayerNames {
  constructor(container) {
    this.container = container;
    this.element = this.render();

    eventEmitter.on('opponentSelected', (numPlayers) => {
      this.update(numPlayers);
    });
  }

  render() {
    let element = document.createElement('div');

    let backBtn = document.createElement('button');
    backBtn.textContent = 'Back';
    backBtn.addEventListener('click', () => {
      eventEmitter.emit('gameSetupViewChange', 'opponentType');
    });

    element.appendChild(backBtn);

    this.container.appendChild(element);
    return element;
  }

  update(numPlayers) {
    // conditionally render form elements depending on how many players there are (1 or 2).
    let prevForms = this.element.getElementsByTagName('form');
    if (prevForms[0]) {
      this.element.removeChild(prevForms[0]);
    }

    let formElement = document.createElement('form');

    let player1InputElement = new playerNameInputElement(1).create();
    let player2InputElement = new playerNameInputElement(2).create();

    let submitBtn = document.createElement('button');
    submitBtn.textContent = 'Okay';
    submitBtn.addEventListener('click', () => {
      let player1Name = player1InputElement.children[0].value;
      eventEmitter.emit('createUserRequested', player1Name);
    });
    formElement.appendChild(submitBtn);

    // conditional rendering part here
    switch (numPlayers) {
      case 1:
        formElement.appendChild(player1InputElement);
        break;
      case 2:
        formElement.appendChild(player1InputElement);
        formElement.appendChild(player2InputElement);
        submitBtn.addEventListener('click', () => {
          let player2Name = player2InputElement.children[0].value;
          eventEmitter.emit('createOpponentRequested', player2Name);
        });
        break;
    }

    submitBtn.addEventListener('click', () => {
      eventEmitter.emit('newGameRequested');
    });

    this.element.appendChild(formElement);
  }

  show() {
    this.container.appendChild(this.element);
  }

  hide() {
    this.container.removeChild(this.element);
  }
}

class playerNameInputElement {
  constructor(number) {
    this.number = number;
    this.element = document.createElement('div');
    this.input = null;
  }

  create() {
    let playerInput = document.createElement('input');
    let playerLabel = document.createElement('label');
    playerLabel.textContent = `Enter player ${this.number} here:`;
    this.element.appendChild(playerInput);
    this.element.appendChild(playerLabel);
    this.input = playerInput;
    return this.element;
  }
}

export default PlayerNames;
