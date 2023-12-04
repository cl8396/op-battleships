import eventEmitter from '../../modules/event-emitter';
import './gameboard.css';
import GameboardTile from '../gameboard-tile/gameboard-tile';

class GameboardComponent {
  constructor(container, gameboard) {
    this.container = container;
    this.shipsVisible = true;
    this.gameboard = gameboard;
    this.tiles = [];
    this.element = this.render(gameboard);

    eventEmitter.on('tileHit', (data) => {
      if (data.gameboard === this.gameboard) {
        this.update(data.coordinates, 'hit');
      }
    });

    eventEmitter.on('tileMissed', (data) => {
      if (data.gameboard === this.gameboard) {
        this.update(data.coordinates, 'miss');
      }
    });

    this.element.addEventListener('click', (e) => {
      let coordinates = this.getCoordinatesFromElement(e.target);
      eventEmitter.emit('targetSelected', {
        coordinates: coordinates,
        gameboard: this.gameboard,
      });
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
        let tile = new GameboardTile(j, i, grid[j][i]);
        this.tiles.push(tile);
        let tileElement = tile.create();

        if (this.shipsVisible) {
          tile.showShip();
        }

        gridContainer.appendChild(tileElement);
      }
    }

    return gridContainer;
  }

  update(coordinates, content) {
    const tile = this.tiles.find((tile) => {
      return tile.x === coordinates[0] && tile.y === coordinates[1];
    });

    switch (content) {
      case 'hit':
        tile.hit();
        break;
      case 'miss':
        tile.miss();
        break;
    }
  }

  getCoordinatesFromElement(element) {
    let x = parseInt(element.getAttribute('x'));
    let y = parseInt(element.getAttribute('y'));

    return [x, y];
  }
}

export default GameboardComponent;
