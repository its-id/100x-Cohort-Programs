import { PubSubManager } from './store';

setInterval(() => {
  const store = PubSubManager.getInstance();

  console.log('**********Subscribing new user and stock**********');
  store.userSubscribe('User' + Math.random(), 'APPL');
}, 5000);
