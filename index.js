import './src/styles/main.css';

import gameController from './src/modules/game-controller';
import ui from './src/modules/ui';

gameController.newGame();

gameController.processTurn([1, 1]);
