import eventEmitter from '../../modules/event-emitter';
import './gameboard.css';

class GameboardComponent {
  constructor(container, gameboard) {
    this.container = container;
    this.element = this.render(gameboard);
  }

  render(gameboard) {
    const element = document.createElement('div');
    element.classList.add('game__gameboard');

    const grid = this.#createGrid(gameboard.grid);
    element.appendChild(grid);
    this.container.appendChild(element);
    return element;
  }

  #createGrid(grid) {
    const gridContainer = document.createElement('div');
    gridContainer.classList.add('game__grid');
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = `repeat(${grid.length - 1}, 1fr)`;

    for (let i = grid[1].length - 1; i > 0; i--) {
      for (let j = 1; j <= grid.length - 1; j++) {
        let tile = document.createElement('div');
        tile.setAttribute('x', j);
        tile.setAttribute('y', i);
        tile.textContent = `${j},${i}`;
        tile.classList.add('game__tile');
        gridContainer.appendChild(tile);
      }
    }

    return gridContainer;
  }
  update() {}
}

export default GameboardComponent;
