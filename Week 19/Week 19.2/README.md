**If we are building a leetcode like system.**

## Ugly Approach:

- User interacts with an server running on an EC2 Machine directly.
- The server processes the code and returns the result to the user.

**Drawbacks**:

- The server can only process a limited number of requests.
- User can get all access to the instance by interacting with the server directly. Eg: sysem("ls") to get the list of files in the server.

---

The **best and robust way** is through the below three:

1. Queues.
2. Pub/Sub.
3. Redis.

### Approach 1:

- User interacts with a server running on an EC2 Machine.
- This server places the code in a queue.
- The queue is then pickedup by different EC2 machines and processed.
- Here, we can use **polling** to check if the code is processed or not.
- 💥 Fun Fact: This is what leetcode actually does.

### Approach 2 (More Optimized usign Pub/Sub):

<p align="center"><img width="927" alt="Screenshot 2024-04-07 at 7 23 07 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/420cdd0b-4600-4104-bd04-e32feb6b914c"></p>


- User interacts with a server running on an EC2 Machine.
- The server places the code in a queue.
- The queue is then pickedup by different EC2 machines and processed.
- The worker then publishes an event to the Pub/Sub.
- The Pub/Sub then broadcasts the message to all the websockets.

---

## What are Queues?

- When a user submits the code to be executed, the code is placed in a queue.
- The queue is then processed by a worker.
- The worker processes the code and returns the result to the user.

---

## What are workers?

- Workers are the processes that process the code in the queue.
- Each worker has its own capacity.
- Its our job to distribute the requests equally among the workers.

---

## Using PubSub to communicate between Websockets

- Alternate method of communication when user submits a code to be executed is through Websockets.
- Now multiple websockets interact with each other using a **PubSub model**.

<br>

- So, when a user submits a code, it is placed in a queue.
- The queue is then processed by a worker.
- The work processes the code and **publishes an event** to the PubSub.

  <br>

- The PubSub then broadcasts the message to all the websockets
    
    <p align="center">or</p>

  <br>

- The websocket that wants to listen to the event, **subscribes to the PubSub**. 

- Anyone who subscribes to this specific PubSub will receive the message.

  <img width="799" alt="image" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/05ce1181-0a06-45ae-80e7-061121e3e327">

  <br>

- The websockets then process the message and return the result to the user.
