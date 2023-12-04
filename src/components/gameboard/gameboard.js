import eventEmitter from '../../modules/event-emitter';
import './gameboard.css';

class GameboardComponent {
  constructor(container, gameboard) {
    this.container = container;
    this.element = this.render(gameboard);
    this.gameboard = gameboard;

    eventEmitter.on('gameboardChange', (data) => {
      if (data.gameboard === this.gameboard) {
        this.update(data.coordinates, data.gameboard);
      }
    });
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

  update(coordinates, gameboard) {
    console.log(coordinates);
    let grid = this.element.children[0].children;
    let tile = this.#findTile(grid, coordinates);
    tile.textContent = 'SHOT';

    let x = coordinates[0];
    let y = coordinates[1];
  }

  #findTile(grid, coordinates) {
    let x = coordinates[0];
    let y = coordinates[1];

    for (let i = 0; i < grid.length; i++) {
      const tile = grid[i];
      const tileX = tile.getAttribute('x');
      const tileY = tile.getAttribute('y');

      if (tileX === x.toString() && tileY === y.toString()) {
        return tile;
      }
    }
  }
}

export default GameboardComponent;
