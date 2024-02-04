### Steps to run
1. `npm install` (one time)
2. `npx prisma migrate dev --name UserAndTodoAdded` (one time)
3. Uncomment the /* .. */ part for each STEP in the `index.ts` file and run the following command in the terminal 👇

   a. `tsc -b`
   
   b. `node dist/index.js`


### To get Database url online (Option 1)
Create one at [Neon](https://neon.tech/)

### To run the database locally (Option 2)
Check [here](https://github.com/its-id/100x-Cohort-Programs/blob/master/Week%2010/Programs/Week%2010.1/README.md)

**Important Step**: Paste your DB url in .env as shown in .env.example file

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



