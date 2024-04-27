import express from 'express';
import cluster from 'cluster';
import os from 'os';

const totalCPUs = 3 || os.cpus().length;

const port = 3000;

//when we type the command: node index.js, the process that runs through this command will be our primary process (user started process)
if (cluster.isPrimary) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Primary ${process.pid} is running`); //Every process will have a unique process id (pid).

  // Fork workers.

  //Inside the primary process, we fork other processes that start working on other cores. For all these processes, the cluster.isPrimary will be false.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {

  //If current process is not started by the user but forked, we will run the express app on that process.
  const app = express();
  console.log(`Worker ${process.pid} started`);

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  //This route will calculate the sum of numbers from 0 to n.
  app.get('/api/:n', function (req, res) {
    let n = parseInt(req.params.n);
    let count = 0;

    if (n > 5000000000) n = 5000000000;

    for (let i = 0; i <= n; i++) {
      count += i;
    }

    //Here, each process (express server) will have its own process id
    res.send(`Final count is ${count} ${process.pid}`);
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}
