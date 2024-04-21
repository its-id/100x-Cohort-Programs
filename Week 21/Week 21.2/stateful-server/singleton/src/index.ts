import { GameManager } from './store';
import { startLogger } from './logger';

startLogger();

setInterval(() => {
  const store = GameManager.getInstance();
  store.addGame({
    id: Math.random(),
    whitePlayer: 'harkirat',
    blackPlayer: 'jaskirat',
    moves: [],
  });
}, 5000);