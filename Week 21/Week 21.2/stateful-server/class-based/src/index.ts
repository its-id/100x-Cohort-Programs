import { gameManager } from './store';
import { startLogger } from './logger';

startLogger();

gameManager.addGame({
  id: '1',
  whitePlayer: 'harkirat',
  blackPlayer: 'jaskirat',
  moves: [],
});

setInterval(() => {
  gameManager.addMove('1', 'e4'); //'1': id of the game, 'e4': move
}, 5000);
