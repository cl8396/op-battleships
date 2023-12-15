import eventEmitter from '../../modules/event-emitter';
import './gameboard.css';
import GameboardTile from '../gameboard-tile/gameboard-tile';

class GameboardComponent {
  constructor(container, player) {
    this.container = container;
    this.shipsVisible = true;
    this.gameboard = player.gameboard;
    this.tiles = [];
    this.element = this.render(player);

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

    eventEmitter.on('shipPlaced', (data) => {
      if (data.grid !== this.gameboard.grid) {
        return;
      }
      if (!this.shipsVisible) {
        return;
      }
      data.coordinates.forEach((set) => {
        this.update(set, 'ship');
      });
    });

    eventEmitter.on('gameOver', () => this.showShips());

    this.element.addEventListener('click', (e) => {
      let coordinates = this.getCoordinatesFromElement(e.target);
      eventEmitter.emit('targetSelected', {
        coordinates: coordinates,
        gameboard: this.gameboard,
      });
    });
  }

  render(player) {
    const element = document.createElement('div');
    element.classList.add('game__gameboard');
    const header = document.createElement('header');
    header.textContent = `${player.name}'s board`;
    element.appendChild(header);

    const grid = this.#createGrid(player.gameboard.grid);
    if (player.isAi) {
      this.hideShips();
    }
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
      case 'ship':
        tile.placeShip();
        break;
    }
  }

  hideShips() {
    this.shipsVisible = false;
    this.tiles.forEach((tile) => tile.hideShip());
  }

  showShips() {
    this.shipsVisible = true;
    this.tiles.forEach((tile) => tile.showShip());
  }

  getCoordinatesFromElement(element) {
    let x = parseInt(element.getAttribute('x'));
    let y = parseInt(element.getAttribute('y'));

    return [x, y];
  }

  hide() {
    this.container.removeChild(this.element);
  }

  show() {
    this.container.appendChild(this.element);
  }
}

export default GameboardComponent;
