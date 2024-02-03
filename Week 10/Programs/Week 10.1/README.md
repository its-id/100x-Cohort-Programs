### To get Database url online (Option 1)

Create one at [Neon](https://neon.tech/)

### Steps to run the database locally (Option 2)

Step 1: Install docker [here](https://docs.docker.com/engine/install/)

**Steps are to get the postgres database running\. (To be run in the terminal)** 👇

Step 2: Pull the latest PostgreSQL Docker: `docker pull postgres`

Step 3: Verify if pulled down successfully: `docker images`

Step 4: Create docker volume: `docker volume create 100x-postgres`

Step 5: Verify if created successfully: `docker volume ls`

Step 6: Create PostgreSQL container (mac/linux specific, check the path for windows): 
```
docker run --name 100x-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -v 100x-postgres:/var/lib/postgresql/data -d postgres`
```

Step 7: Access PostgreSQL using psql: `docker exec -it 100x-postgres psql -U postgres`


<br>

**Important Step**: Create a **.env** file in the root directory and paste your DB url as shown in .env.example file

---

### To run the steps.

1. `npm install` (one time)
2. Uncomment the /* .. */ part for each STEP in the `index.ts` file and run the following command in the terminal 👇

   a. `tsc -b`
   
   b. `node dist/index.js`

> **Note**: If you are using windows, you might need to change the volume path to `C:\ProgramData\docker\volumes\100x-postgres\_data` or something similar.


---
### Stop the container
```
docker stop 100x-postgres
```

### Remove the container
```
docker rm 100x-postgres
```

### Remove the postgres docker image
```
docker rmi postgres
```
---



