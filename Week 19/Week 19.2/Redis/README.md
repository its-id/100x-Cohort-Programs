## What is Redis?

- Redis is an open-source, in-memory data structure store, used as a **database**, **cache**, and **message broker**.
- Even though, it can store data, it should never be used as a primary database.
- Its main purpose is to cache data i.e store data in memory and retrieve it quickly.
- As a message broker, it can be used to send messages between different services. Eg: **Pub/Sub** model.

---

## How does Caching works?

- Assume "DailyCode" Website example.
- When user comes first time, the server fetches the data from the database and **stores it in an in-memory location**.
- When the user comes again, the server fetches the data from that in-memory location and not from the database.

---

## Redis as a Cache Store:

- Redis is fast.
- Redis is in-memory.
- Redis is persistent.
- Redis is atomic.
- Redis is single-threaded.

---

## Use cases where Redis has advantage:

- In case of microservices architecture, Redis (stored seperately in another VM) can be used to store the data that is shared among the services. This is called **"Distributed Caching"**.
- In case Redis goes down, Redis does store the data in the file system as well. So, when Redis comes back up, it can fetch the data from the file system and bring back to its original state.

---

## Snapshots in Redis (Persistance in Redis):

  <p align="center"><img width="500" alt="Screenshot 2024-04-07 at 7 50 00 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/ac5bce3e-b27d-4979-a879-6e3f17ab13bb"></p>

- Redis takes snapshots of the data in the memory and stores it in the disk.
- This is done to ensure that the data is not lost in case of a crash.
- The snapshot is taken at regular intervals.
- The snapshot is stored in the disk as an RDB (Redis Database) file.

  **Note**: Always push the req data to queue first, before updating the redis. In this way, even when redis goes down, it can get the data back.

---

## Interesting Scenario (Multple Requests to DB):

<p align="center"><img width="500" alt="Screenshot 2024-04-07 at 7 54 22 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/4febae29-7be1-42e2-9851-699ab6ffc2a7"></p>

Consider example: two types of user requests are happening to the BE.

- User Browser.
- Admin Browser.
- In the third minute, the admin browser makes a request to the BE to update the data.

**Q.** What would you do? Answer by first priniciples?

1. clear redis, put data in postgres.
2. update data in redis, update data in postgres.
3. update data in postgres, update data in redis.

**Ans: 1.** clear redis, put data in postgres. Because in other two cases, there is a chance that one of the services goes down. This is a major problem than no change in both

---

## Setting up & Running Redis

- Install & open [Docker](https://docs.docker.com/get-docker/).
- Run the below command to install and start Redis:

  ```bash
  docker run --name 100x-redis -d -p 6379:6379 redis
  ```

- Connecting to your container:

  ```bash
  docker exec -it 100x-redis /bin/bash
  ```

- Connecting to Redis CLI:

  ```bash
    redis-cli
  ```

  ### <p align="center">Congratulations 🎉</p>

    <p align="center">You have successfully installed and started Redis.</p>
    <p align="center">
      <img width="700" alt="Screenshot 2024-04-07 at 8 11 35 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/4f70de72-ad23-4417-98f6-2ca290cf8902">
    </p>

---

## Using Redis as a DB (CLI)

- **Setting Data**: To store data in Redis, we use the `set` command. It takes two arguments, the key and the value. We can store strings, integers, and even JSON objects.

  ```bash
  set key value
  ```

  Eg: `set name "100x"`, `set tracks "[{title: 'typescript', difficulty: 'easy'}]"`

<br>

- **Getting Data**: To get data from Redis, we use the `get` command. It takes one argument, the key.

  ```bash
  get key
  ```

  Eg: `get name`, `get tracks`

<br>

- **Deleting Data**: To delete data from Redis, we use the `del` command. It takes one argument, the key.

  ```bash
  del key
  ```

  Eg: `del name`, `del tracks`

  <br>

  **If you want to set multiple values in a key, you can use 'HDEL/HGET/HDEL' (H=Hash) command.**

  <br>

  It takes four arguments, the key, the field, size (optional) and the value.

  ```bash
  HSET |key or key:<size>| field value #Eg: `HSET user:100x name "100x" age 20`
  HGET |key or key:<size>| field value #Eg: `HGET user:100 name`
  HDEL |key or key:<size>| field value #Eg: `HDEL user:100 name`
  ```

  More Commands [here](https://redis.io/commands/).

---

## Redis as a Queue (CLI)

- You can also push to a topic / queue on Redis and other processes can pop from it.

- Push data to the queue using the `LPUSH` (from left) command.

  ```bash
  LPUSH key value
  ```

  Eg: `LPUSH problems "{problem_id: 1, language: 'java'}"`, `LPUSH problems "{problem_id: 2, language: 'python'}"`

    <br>

- Pop data from the queue using the `RPOP` (from right) command.

  ```bash
  RPOP key
  ```

  Eg: `RPOP problems`

  <br>

- If you want to block the thread until a value is available in the queue, you can use the `BRPOP/BLPOP` command. Here, `B` stands for blocking. Takes a key and a timeout (in seconds).

  ```bash
  BRPOP key timeout
  ```

  Eg: `BRPOP problems 0`

---

## Talking to Redis from Node.js

1.  Create a new Node.js project folder.
2.  Inside, create two folders: `workers` and `express-backend`.
3.  Initialize a new Node.js typescript project in both folders.

    ```bash
    npm init -y
    npx tsc --init
    ```

4.  Edit `tsconfig.json` to include the below configurations:

    ```json
    {
      "compilerOptions": {
        "target": "ES6",
        "module": "commonjs",
        "outDir": "./dist",
        "rootDir": "./src",
        "strict": true
      }
    }
    ```

5.  Install `express` and `@types/express` and `redis` in the `express-backend` folder.

    ```bash
    npm i express @types/express redis
    ```

6.  Install only `redis` in the `workers` folder.

    ```bash
    npm i redis
    ```

    <br>

    **Completing the pushing of data to the queue will be done in the next step 👇**

    <br>

7.  Create a new file `index.ts` in the `express-backend/src` folder and add the code to connect to Redis and store data in queue.

8.  Build the project using `tsc -b` and run the project using `node dist/index.js`.

9.  Send the following data to `http://localhost:3000/submit` to see if the data is stored in Redis:

    ```json
    {
      "problemId": 1,
      "code": "console.log('Hello World')",
      "language": "javascript"
    }
    ```

10. Check if the data is stored in Redis by running the below command in the Redis CLI:

    ```bash
    LRANGE problems 0 -1
    ```

    ### <p align="center">Congratulations 🎉</p>

    <p align="center">You have successfully stored data in Redis.</p>
    <p align="center">
    <img width="700" alt="Screenshot 2024-04-07 at 8 52 34 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/79ba9dcf-9e83-4ecf-9af7-d80f5f908b02">
    <img width="600" alt="Screenshot 2024-04-07 at 8 53 24 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/3595efe3-4ede-4133-ab89-93129232b5cd">
    </p>

    <br>

    **Completing the popping of data from the queue and processing it will be done in the next step👇**

    <br>

11. Now, create a new file `index.ts` in the `workers/src` folder and add the logic of popping the data from the queue and processing it.

12. Check by running multiple workers to check if the data is processed by multiple workers.

    ### <p align="center">Congratulations 🎉</p>

    <p align="center">You have successfully implemented a queue using Redis and processed the data using multiple workers.</p>
    <p align="center">
      <img width="450" alt="Screenshot 2024-04-07 at 8 55 00 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/04ee31fe-0f06-4939-8862-aa531ca4c013">
    </p>
