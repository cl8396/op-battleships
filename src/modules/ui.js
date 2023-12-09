import eventEmitter from './event-emitter';
import Game from '../components/game/game.js';
import Menu from '../components/main-menu/main-menu.js';

class UI {
  constructor() {
    this.container = document.getElementById('Battleships');
    this.game = new Game(this.container);
    this.menu = new Menu(this.container);

    // Initialize the UI with the menu visible
    this.menu.show();
    this.game.hide();

    // Event listener for a new game request
    eventEmitter.on('newGameRequested', () => {
      // Handle the event by switching to the game view
      this.menu.hide();
      this.game.show();
    });

    eventEmitter.on('openMainMenu', () => {
      this.menu.show();
      this.game.hide();
    });
  }
}

const ui = new UI();

export default ui;
