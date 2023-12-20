import Component from '../component.js';
import GameStatusDisplay from '../game-status/game-status';
import GameboardsContainer from '../gameboards-container/gameboards-container';
import GameMenu from '../game-menu/game-menu';

class Game extends Component {
  constructor(container) {
    super(container);
    this.element = this.#createElement();
  }

  #createElement() {
    let element = document.createElement('div');
    new GameStatusDisplay(element);
    new GameboardsContainer(element);
    new GameMenu(element);
    return element;
  }
}

export default Game;
