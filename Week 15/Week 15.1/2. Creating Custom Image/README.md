## What is Dockerfile?

- A <b>Dockerfile</b> is a text document that contains all the commands a user could call on the command line to assemble an image.

- Useful for creating your own custom Docker images.

---

## How to write a Dockerfile?

A Dockerfile has two main parts:

1. The base image
2. The commands to run on the base image

---

## Building a custom Docker image

1. Create a Dockerfile in the root of the project. In our case, the root of the project is `Week 15.1/2. Creating Custom Image/base-image`.
   <br>

2. Add the following content to the Dockerfile:

   ```Dockerfile
    # Use the official image as a base image
    FROM node:alpine

    # Set the working directory
    WORKDIR /app

    # Copy the all files to the working directory
    COPY package.json package-lock.json ./
    COPY prisma ./prisma

    # Install dependencies and build the project
    RUN npm install

    # Copy the rest of the files to the working directory
    COPY . .

    # Build the project
    RUN npm run build

    # Generate the prisma client
    RUN npx prisma generate

    # Expose a port where the app will run
    ENV PORT=3000

    # Go to the `dist` directory and run the `node index.js` file
    CMD ["node", "dist/index.js"]
   ```

    <details>
    <summary><b>Explaining the above Dockerfile commands</b></summary>

   - `FROM node:alpine`: Use the official Node.js image as a base image. The `alpine` tag is used to use the lightweight version of the Node.js image.

   - `WORKDIR /app`: Set the working directory to `/app`.

   - `RUN`: Run the commands followed by the `RUN` keyword.

   - `COPY`: Copy the files from source to destination.

   - `EXPOSE`: Expose a port where the app will run.

   - `CMD`: Run the command when the container starts.
     </details><br>

     **Note**: When copying the files to the working directory, make sure to add the unnecessary files and directories to the `.dockerignore` file to exclude them from being copied to the Docker container.

     ```plaintext
     # Inside .dockerignore file
     node_modules
     dist/
     ```

     <br>

3. Build the Docker image using the following command:

   ```bash
   docker build -t 100x-node .
   ```

   <details>
   <summary><b>Explaining the above command</b></summary>

   - `-t` flag is used to tag the image with a name.

   - `100x-node` is the name of the image.

   - `.` is the path to the Dockerfile.
   </details>
   <br>

4. Check the built image using the following command:

   ```bash
   docker images
   ```

5. Run the Docker container using the following command:

   ```bash
   docker run -p 3000:3000 100x-node
   ```

---

## Passing in ENVIRONMENT variables

- You can inject environment variables into the Docker container using the `ENV` keyword in the Dockerfile.

- Add the following content to the Dockerfile:

  ```Dockerfile
  ...

  # Set the environment variables
  ENV PORT=3000
  ENV DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

  ...
  ```

  <details>
  <summary><b>Explaining the above Dockerfile commands</b></summary>

  - `ENV`: Set the environment variables.

  - `PORT=3000`: Set the `PORT` environment variable to `3000`.

  - `DATABASE_URL="postgresql://user:password@localhost:5432/mydb"`: Set the `DATABASE_URL` environment variable to `postgresql://user:password@localhost:5432/mydb`.
  </details>
  <br>

**Note**: Putting the secret keys in the Dockerfile is **not a good practice**. To use the environment variable when running the container use the `-e` flag followed by the environment variable name and value.

```bash
docker run -p 3000:3000 -e PORT=3000 -e DATABASE_URL="postgresql://user:password@localhost:5432/mydb" 100x-node
```

### <p align="center">Congratulations 🎉</p>

<p align="center">You have successfully created a custom Docker image and ran a container using it.</p>
<p align="center">
<img width="1382" alt="Screenshot 2024-03-09 at 9 07 24 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/72a2d8a5-b9f5-432e-91d1-029b56f91c57">
<img width="1382" alt="Screenshot 2024-03-09 at 9 07 44 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/8ea90b91-fdfd-45a7-a289-e088dc61c61a">
<img width="500" alt="Screenshot 2024-03-09 at 8 50 44 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/95ae1852-bb29-4ae1-9ab6-5b0b12d7e702">
   
</p>

---

### Running an interactive bash:

```bash
docker run -it 100x-node sh
```
<img width="800" alt="Screenshot 2024-03-09 at 8 51 09 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/1b094fbe-accd-4d0c-bed4-7808d6575df0">

<details>
<summary><b>Explaining the above command</b></summary>

- `-it` flag is used to run the container in the interactive mode.

- `sh` is the command to run in the container.

- `<container_id>` is the id of the container.
</details>
<br>

## Pushing to Docker Hub

1. Log in to Docker Hub using the following command:

   ```bash
   docker login
   ```

2. Tag the image using the following command:

   ```bash
   docker tag 100x-node <username>/100x-node
   ```

   <details>
   <summary><b>Explaining the above command</b></summary>

   - `100x-node` is the name of the image.

   - `<username>/100x-node` is the username and the name of the image on Docker Hub.
   </details>
   <br>

3. Push the image to Docker Hub using the following command:

   ```bash
   docker push <username>/100x-node
   ```

   <details>
   <summary><b>Explaining the above command</b></summary>

   - `<username>/100x-node` is the username and the name of the image on Docker Hub.
   </details>
   <br>


