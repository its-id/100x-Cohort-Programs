import { GameManager } from './store';

export function startLogger() {
  setInterval(() => {
    const store = GameManager.getInstance();
    store.logState();
  }, 4000);
}
