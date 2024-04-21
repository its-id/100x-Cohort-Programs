import { gameManager } from './store';

export function startLogger() {
  setInterval(() => {
    console.log(gameManager.games);
  }, 4000);
}
