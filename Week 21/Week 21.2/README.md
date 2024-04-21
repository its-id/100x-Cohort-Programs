## Stateless Servers

- Stateless servers are servers that do not store any state information about the client session in backend.
- means, they don’t have any in memory variables that they use.
- rely on database or other external storage to store the state information.
- All normal websites backends are usually stateless
- Ex: E-commerce websites, Blogs, etc.

### Advantages

- Easy to scale
- Cost efficiant
- Easy to maintain

### Disadvantages

- Storing the state of a in a realtime operation in a database can be slow. For eg: Online Games, Exchanges etc.

---

## Stateful Servers

- Stateful servers are servers that store some state information in backend.
- They store the state information in memory or in a cache.
- Good examples are:
  - Realtime Games
  - Creating an in memory cache. For eg: Redis

### Disadvantages

- Hard to scale

---

## Stickiness

- Stickiness is a technique used to maintain the session of a client with a particular server.
- Making sure that the user who is interested in a specific room, gets connected to a specific server.
- Important in Scenarios Operations are happening in realtime or are interactive.
- For example, in a realtime game, both the users should be connected to the same server to play the game.
- This is achieved by using a load balancer.

### Alternative

<p align="center"><img width="600" alt="Screenshot 2024-04-21 at 7 38 37 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/99909f95-1334-425f-8eb2-c5ccbf129efb"></p>

- Use Redis as cache.
- In this, all servers store the state in a Redis cache.
- Even if two users in same room are connected to different servers, the two servers can communicate with each other using the Redis cache.

<br>

**Q: How does Load Balancing happens in Stateful servers?**

<p align="center"><img width="600" alt="Screenshot 2024-04-21 at 7 41 36 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/b9481156-6868-471f-9c65-16155c321b5a"></p>

- In a large scale application, we have routers that are responsible for routing the requests to the servers.
- The routers are responsible for maintaining the stickiness.
- All the servers keep sending their health status along with usage to the router.
- Based on the health status and usage, the router decides which server to route the request to.
- When a new user connects, the router checks the state of the servers and routes the request to the server that has the least load.
- When a server goes down, the router routes the request to the next available server.

---

## How to Store State in JS process

<p align="center"><img width="600" alt="store state in js" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/1ab530eb-0a11-43f2-80fd-c98eac161c59"></p>

- In a stateful server, above representation is a basic way to store the data in the backend.
- But in a real world scenario, we can use a database or a cache to store the data.
- If we are storing in-memory, we should seperate the state from the server processes like below.
  <img width="550" alt="store state in js" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/dfda278f-d0d8-44bd-9726-e7141b0220e1">

<br>

### Method 1: Storing States In-Memory

1. Go to `/stateful-server/src` directory.
2. Run `npm install` to install the dependencies.
3. Exploring the files below:

   - `index.ts`: The main file that starts the server.

     - Here, we simulate the game.
     - For now, we are pushing random moves into the game array in specific time intervals.
     - We also call the startLogger() function exported from `logger.ts`.

     <br>

   - `store.ts`: The file that stores the state in memory. It has the following areas of interest:

     - `export const games: Game[] = [];`: The array that stores the games.

     <br>

   - `logger.ts`: The file that logs the messages. This file is important for debugging.

     ```ts
     import { games } from './store';

     export function startLogger() {
       setInterval(() => {
         console.log(games);
       }, 4000);
     }
     ```

4. Run the server using `npm start` in terminal with the above directory as root.

**Problem with above approach**:

- Less structured
- Hard to maintain

Wouldn't it be better if we could create a class for doing all the logic and just call the method in the main file?

```ts
GameStore.addGame('room1', 'e5');
```

<br>

### Method 2: Storing States in a Class

1. Go to `/stateful-server/class-based/src` directory.
2. Explore the `store.ts` file to check the class implementation.
   - The class has the following methods:
     - `addGame(room: string, move: string)`: Adds a game to the games array.
     - `addRoom()`: Returns the games array.
3. Run the server using `npm start` in terminal with the above directory as root.

**Problem with this approach**:

- Someone may create a local instance of the global store.
- Vulnerable to mistake.

**Solution**: Use Method 3

---

## Method 3: Using Singleton Pattern

Basic Soln that may be coming to one's mind is to make the constructor private.
But that won't be sufficient because if we do this, we won't be able to create even the first instance of the class.
Thus, we need something more.

**Pointers to Know Before**:

- The keyword `static` is used to create a static variable or method.
- Static methods or class belong to the class itself, rather than to instances of the class.

**Singleton Pattern**:

1. Go to `/stateful-server/singleton/src` directory.

2. Checkout the `store.ts` file to see the implementation of the singleton pattern.

- We create static instance of the class of same type

  ```ts
  class GameStore {
    private static instance: GameStore;

    private constructor() {}

    static getInstance() {
      if (!GameStore.instance) {
        GameStore.instance = new GameStore();
      }
      return GameStore.instance;
    }
  }
  ```

- We create a static method that returns the instance of the class.

  - Inside the method, we check if the instance is already created or not.
  - If not, we create the instance and return it.
  - If yes, we return the instance.

- We make the constructor private so that no one can create an instance of the class.

3. In the `index.ts` file, we create an instance of the class using the `getInstance()` method and call the methods on the instance.

```ts
...
const store = GameStore.getInstance();
store.addGame('room1', 'e5');
...
```

4. In the `logger.ts` file, we also create an instance of the class using the `getInstance()` method and call the methods on the instance.

```ts
...
store.logState();
...
```

5. Run the server using `npm start` in terminal with the above directory as root.

**Benefit**:

- We have successfully created a stateful server in the most secure way. (no chance of accidental creation of local states.)
- Try creating a local instance inside one of the files. It won't let you.
  <img width="837" alt="Screenshot 2024-04-21 at 10 03 46 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/f656fb30-fcd4-4c80-9e01-ee618040dc1b">

---

## Singleton Pattern with PubSub

### What is PubSub?

- PubSub stands for Publish-Subscribe.
- Lets backend servers communicate with each other.
- For eg: If there are three users. Two of them are in same room connected to same server1 and another connected to server2.
  - The user connected to server2 wants to spectate the game of the users connected to server1.
  - Here, the server2 can subscribe to PubSub to get the updates of the game in server1.

### Creating Singleton Pattern with PubSub

Here, we try to create a PubSubManager Class that is a singleton class.

**Consider Scenario:**

- A system where users can subscribe to the feed of stocks (prices).
- This application will be used by > 1Mn users.

**What is expected?**

- Keep track of all stocks users `on a specific server` are interested in.
- Should tell the pub sub whenever a new stock is added or a stock is removed from the list of interested stocks on that server.
- Should Relay the events to the right sockets whenever an event is received.

<p align="center"><img width="600" alt="Screenshot 2024-04-21 at 8 38 08 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/381c6dfd-b05d-4f64-8c97-a8ccbf379840"></p>

**Implementation**

1. Start redis using docker.

   ```bash
   docker run --name 100x-redis -d -p 6379:6379 redis
   ```

- If you want to connect to the redis container. Use the below command:

  ```bash
  docker exec -it 100x-redis /bin/bash
  redis-cli
  ```

- To subscribe to the redis channel, use the below command:

  ```bash
  SUBSCRIBE stocks
  ```

- To publish to the redis channel, use the below command:

  ```bash
  PUBLISH stocks "AAPL"
  ```

- To unsubscribe from the redis channel, use the below command:

  ```bash
  UNSUBSCRIBE stocks
  ```

2. Go to `/stateful-server/pubsub-with-singleton/src` directory and run `npm install` to install the dependencies.

<br>

3. Checkout the `/store.ts` file to see the implementation of the singleton pattern with PubSub. The class works in following way:

   - The `class` starts with creating a `private static instance` of the class, `private redis client` to connect to the redis server and `private subscriptions` map to store subscriptions to any stock by collection of users.

   - The private `constructor` is private to prevent the creation of instances of the class.

   - The `getInstance()` method is used to get the instance of the class. If the instance is not created, it creates the instance and returns it.

   - The `userSubscribe()` method is used to subscribe to a stock. It takes the `stock` and `userId` as arguments.

     - First check: If the stock is present in the map. If not, we create our first entry to that stock's key in the map.
     - Second Check: If current user is not already subscribed to the stock. If not, we add the user to the list of users subscribed to that stock.

     - In the end, we check if stock has already previous subscriptions (`map[stock].length > 1`). If not, this means this is our first subscription -> We make our server subscribe to the stock in redis -> call the `handleMessage()` function with the message received from the redis.

   - The `userUnSubscribe()` method is used to unsubscribe from a stock. It takes the `stock` and `userId` as arguments.

     - Here, we directly remove the user from the list of users subscribed to that stock using `filter()` method.
     - We remove the user from the list of users subscribed to that stock.
     - In the end, we check if stock has no subscriptions (`map[stock].length === 0`). If yes, this means this is our last subscription -> We make our server unsubscribe from the stock in redis.

   - The `handleMessage()` method is used to handle the message received from the redis.

     - Here, we console the message received from the redis in the terminal.
     - Next, we send the message to all the users subscribed to that stock.

   - `disconnect()` method is used to disconnect and clean up the redis client.

4. Check the `index.ts` file to see how we create a dummy subscription service to test the PubSubManager class.

5. Run the server using `npm start` in terminal with the above directory as root. (Make sure your redis server is running)

<p align="center"><b>Congratulations! 🎉 You have successfully implemented PubSub with Singleton Architecture in a Stateful Backend</b></p>
<p align="center">
<img width="441" alt="Screenshot 2024-04-21 at 11 16 32 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/0e9772fa-327a-46d6-a6ef-9928e734d5ce"></p>
