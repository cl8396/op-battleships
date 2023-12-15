import './gameboard-tile.css';

class GameboardTile {
  constructor(x, y, content) {
    this.x = x;
    this.y = y;
    this.content = content;
    this.element = null;
  }

  create() {
    const tile = document.createElement('div');
    tile.setAttribute('x', this.x);
    tile.setAttribute('y', this.y);
    tile.classList.add('game__tile');
    this.element = tile;
    return tile;
  }

  placeShip() {
    this.element.classList.add('game__tile--ship');
  }

  showShip() {
    if (this.content && this.element) {
      this.element.classList.add('game__tile--ship');
    }
  }

  hideShip() {
    if (this.content && this.element) {
      this.element.classList.remove('game__tile--ship');
    }
  }

  hit() {
    if (this.element) {
      this.element.classList.add('game__tile--hit');
    }
  }

  miss() {
    if (this.element) {
      this.element.classList.add('game__tile--miss');
    }
  }
}

export default GameboardTile;
