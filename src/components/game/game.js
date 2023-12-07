import GameStatusDisplay from '../game-status/game-status';
import GameboardsContainer from '../gameboards-container/gameboards-container';
import GameMenu from '../game-menu/game-menu';

class Game {
  constructor(container) {
    this.container = container;
    this.element = this.render();
  }

  render() {
    let element = document.createElement('div');
    new GameStatusDisplay(element);
    new GameboardsContainer(element);
    new GameMenu(element);

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

export default Game;
