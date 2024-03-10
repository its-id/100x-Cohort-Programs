## What are Networks?

- Networks are used to connect containers.
- Containers on the same network can communicate with each other.
- By default, containers are connected to a network called `bridge`.
- We can create custom networks to connect containers.
- We can also use networks to connect containers to other services like databases or the internet.

---

## Using Network to connect containers

1. Create a new network:

   ```bash
   docker network create 100x-network
   ```

   <br>

2. Run the `mongodb` container on the new network with volume:

   ```bash
   docker run -d -p 27017:27017 --name=100x-mongo --network=100x-network -v 100x-mongo-data:/data/db mongo:latest
   ```

    <details>
    <summary>Understanding the command in detail</summary>

   - `--network`: This flag is used to specify the network on which the container should run.
   - `100x-network`: This is the name of the network.
   - `-v`: This flag is used to create a volume. It takes the name of the volume as an argument.
   - `100x-mongo-data`: This is the name of the volume.
   </details>
   <br>

3. Paste the mongodb connection string inside the `base-image/db.ts` file:

   ```ts
   ...
   const mongoUrl: string = 'mongodb://100x-mongo:27017/100x-db';
   ...
   ```

   or you can pass the connection string as an environment variable (recommended. use this command after building the image):

   ```bash
   docker run -d -p 3000:3000 --name=100x-node --network=100x-network -e MONGO_URL=mongodb://100x-mongo:27017/100x-db 100x-node
   ```

    <details>
    <summary>Understanding the command in detail</summary>

   - `-e`: This flag is used to pass environment variables to the container.
   - `MONGO_URL`: This is the name of the environment variable.
   - `mongodb://100x-mongo:27017/100x-db`: This is the value of the environment variable.
   </details>

    <br>

4. Build a new image from the `base-image` directory:

   ```bash
   docker build -t 100x-node .
   ```

5. Run the new image on the same network:

   ```bash
    docker run -d -p 3000:3000 --name=100x-node --network=100x-network 100x-node
   ```

    <br>

   ### <p align="center">Congratulations 🎉</p>

    <p align="center">You have successfully connected the <code>node</code> container to the <code>mongodb</code> container using a custom network.</p>
    <p align="center">
    <!-- <img width="1382" alt="Screenshot 2024-03-09 at 9 07 24 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/72a2d8a5-b9f5-432e-91d1-029b56f91c57">
    <img width="1382" alt="Screenshot 2024-03-09 at 9 07 44 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/8ea90b91-fdfd-45a7-a289-e088dc61c61a">
    <img width="500" alt="Screenshot 2024-03-09 at 8 50 44 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/95ae1852-bb29-4ae1-9ab6-5b0b12d7e702"> -->
      
    </p>

---

## Other useful commands

- To list all the networks:

  ```bash
  docker network ls
  ```

- To inspect a network:

  ```bash
    docker network inspect 100x-network
  ```

- To remove a network:
  ```bash
  docker network rm 100x-network
  ```
- To remove all the networks:
  ```bash
  docker network prune
  ```
