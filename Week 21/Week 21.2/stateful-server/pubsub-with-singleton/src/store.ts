// Import the necessary module from the 'redis' package
import { createClient, RedisClientType } from 'redis';

export class PubSubManager {
  private static instance: PubSubManager;
  private redisClient: RedisClientType;

  //in this map, the key is the stock ticker and the value is an array of user IDs
  private subscriptions: Map<string, string[]>;

  // Private constructor to prevent direct construction calls with the `new` operator
  private constructor() {
    // Create a Redis client and connect to the Redis server
    this.redisClient = createClient();
    this.redisClient.connect();
    this.subscriptions = new Map();
  }

  public static getInstance(): PubSubManager {
    if (!PubSubManager.instance) {
      PubSubManager.instance = new PubSubManager();
    }

    return PubSubManager.instance;
  }

  userSubscribe(userId: string, stockTicker: string) {

    if (!this.subscriptions.has(stockTicker)) {
      // If the stock ticker is not in the subscriptions map, create a new array with the user ID
      this.subscriptions.set(stockTicker, [userId]);
    }

    const users = this.subscriptions.get(stockTicker);

    if (users && users.length > 0) {
      
      // Check if the user ID is not already subscribed
      if (!users.includes(userId)) {
        users.push(userId);

        // Update the subscriptions map with the new array
        this.subscriptions.set(stockTicker, users);
      }


      // Server Subscribes to specific stock ticker Redis channel as soon as first user subscribes
      if (users.length === 1) {
        this.redisClient.subscribe(stockTicker, (message) => {
          this.handleMessage(stockTicker, message);
        });

        console.log(`Subscribed to '${stockTicker}' in Redis Channel!`);
      }
      
    }

  }

  userUnSubscribe(userId: string, stockTicker: string) {

    //Removing user from the subscription list
    const updatedUsers = this.subscriptions
      .get(stockTicker)
      ?.filter((user) => user !== userId);

    this.subscriptions.set(stockTicker, updatedUsers || []);

    // Unsubscribe the server from the stock ticker channel if no users are subscribed
    if (this.subscriptions.get(stockTicker)?.length === 0) {
      this.redisClient.unsubscribe(stockTicker);

      console.log(`Unsubscribed from '${stockTicker}' in Redis Channel!`);
    }
  }

  // Function to handle messages received from the Redis channel and send them to the subscribed users
  handleMessage(stock: string, message: string) {
    console.log(`Received message from Redis Channel: ${stock} - ${message}`);

    this.subscriptions.get(stock)?.forEach((user) => {
      console.log(`Sending message to user: ${user}`);
    });
  }

  async disconnect() {
    await this.redisClient.quit();
  }
}
