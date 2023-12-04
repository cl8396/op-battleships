import './game-menu.css';

class GameMenu {
  constructor(container) {
    this.container = container;
    this.element = this.render();
  }

  render() {
    const element = document.createElement('div');
    element.classList.add('game__menu');
    element.textContent = 'game menu';
    this.container.appendChild(element);

    return element;
  }
}

export default GameMenu;
