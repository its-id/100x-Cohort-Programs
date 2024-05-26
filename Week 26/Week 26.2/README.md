# Exploring Open-Source Alternatives to Logging & Monitoring

## Problems with Newrelic

- Newrelic is expensive at scale
- They own your data
- Very hard to get data out of Newrelic

## Alternatives

- Prometheus
- Grafana
- Jaeger

## Prometheus

- its a time-series database.
- can monitor any numerical data.

### Understanding Architecture

- It starts with the linux machine used for monitoring.

- First, the prometheus server is installed on the linux machine. After that, it creates an endpoint for the application to send data to.

- After that, it starts pulling data from the endpoint created by the (node.js or any other app) application.

- It keeps on polling on the data and stores it in the time-series database.

- If you also want your machine's stats, you can install **node-exporter** on the machine.

- Most of the times, it is a kind of Pull based Architecture. But, if you want to push data to prometheus, you can use **push gateway** as well (though its a short-lived job).

- For Service Discovery (to know which services are running on which machine), you can use **consul**.

- In the end, you can visualize these ugly stats/metrics in the Prometheus UI.

### Drawbacks

- It gives you total/cummulative stats (not realtime). Thus, it becomes hard to get the exact stats per second.

- You cannot horizontally scale Prometheus. You can only vertically scale it (keep increasing space on the same machine).

- Single Node Process (if it goes down, you lose all the data).

To learn more about its architecture, visit [here](https://prometheus.io/docs/introduction/overview/).

### Understanding Metric Format

- **`http_requests_total{method="post",route="/user", code="200"}`** : Total HTTP requests with method `post`, to route `/user` returning status code `200`.

### PromQL

- Its a query language for Prometheus.
- **flexible query language**.

### Setting up our Express App

1. Go to `/express-app` and run `npm install` to install all the dependencies, or initialize your own express app.

<br>

2. Check the `package.json` to check the libraries installed and the script to run the app.

   <br>

   Now, we will be writing a middleware to monitor the stats of our app.

3. First, we check how much time does it take to complete a request.

   ```ts
   //midleware/monitor.ts

   import { Request, Response, NextFunction } from 'express';

   export const monitor = (req: Request, res: Response, next: NextFunction) => {
     const start = Date.now();
     res.on('finish', () => {
       const duration = Date.now() - start;
       console.log(`Request to ${req.path} took ${duration}ms`);
     });
     next();
   };
   ```

   <br>

4. Run the app using `npm start`, request to the one of the endpoints and check the logs.

<br>

### Types of Metrics in Prometheus

- **Counter** :

  - its the cummulative metric (e.g. counting number of requests)

  - **Example Metric** :

      <details>
      <summary>Explaining Metric</summary>

        - Shows **554* requests have been made to the `/metrics` endpoint with status code `200` and method `GET`.

        - can only go **up**.

      </details>

- **Gauge** :

  - value can go up and down. can be used to measure values that fluctuate (e.g. number of users online, memory usage)

  - **Example Metric** :
      <details>
      <summary>Explaining Metric</summary>
      
       - Shows **5** users are online (concurrent requests to the server).
       
       - can go **up** and **down**.

    - Mostly used for websocket servers (to check number of active connections).

      </details>

- **Histogram**:

  - used to measure the distribution of values (e.g. response time of requests)

  - **Example Metric**:

      <details>
      <summary>Explaining Metric</summary>

    - **554** People took between 0.1 to 5 ms to complete the request.

    - Why is it done like this? - You can look into the certain percentile of the data. For example, you can check the 95th percentile of the data.

          - File size is limited.

      </details>

### Adding Prometheus

- Install Prometheus Client using `npm install prom-client`.

<br>

**Implementing Counter**

1. First, let's implement the **`counter`** metric. Check the middleware `requestCounter.ts` to see the implementation of createing the `counter` metric.

   ```ts
   //middleware/requestCounter.ts

   ...
   import client from 'prom-client';

   // Create a counter metric
   const requestCounter = new client.Counter({
     name: 'http_requests_total',
     help: 'Total number of HTTP requests',
     labelNames: ['method', 'route', 'status_code'],
   });

   ...

   // Increment request counter
   requestCounter.inc({
    method: req.method,
    route: req.route ? req.route.path : req.path,
    status_code: res.statusCode,
   });

   ...
   ```

2. Add this middleware to our app:

   ```ts
   // app.ts
   ...

   import { requestCounter } from './middleware/requestCounter';
   app.use(monitor);
   app.use(requestCounter);

   ...
   ```

3. To expose the metrics, we need to create a new endpoint `/metrics`:

   ```ts
   // app.ts
   import client from 'prom-client';
   ...

   app.get('/metrics', (req, res) => {
     const metrics = await client.register.metrics();
     res.set('Content-Type', client.register.contentType);
     res.end(metrics);
   });

   ...
   ```

4. Run the app and go to `localhost:3000/metrics` to see the metrics.

5. To see the metrics coming, try sending requests to the `/user` endpoint and check the `/metrics` route again.

**Implementing Gauge**

1. Check the middleware `activeUserCounter.ts` to see the implementation of createing the `gauge` metric.

   ```ts
   //middleware/activeUserCounter.ts

   ...
   import client from 'prom-client';

   // Create a gauge metric
   const activeUserGauge = new client.Gauge({
     name: 'active_users',
     help: 'Number of active users',
     labelNames: ['method', 'route'],
   });

   ...

   // Increment active user
   activeUserGauge.inc();

   ...
   // Decrement active user
   activeUserGauge.dec();

   ...
   ```

2. Add this middleware to our app:

   ```ts
   // app.ts
   ...

   import { activeUserGauge } from './middleware/activeUserCounter';
   app.use(monitor);
   app.use(activeUserGauge);

   ...
   ```

3. Run the app and go to `localhost:3000/metrics` to see the metrics. You will see only one active connection showing. 

- Try adding an artificial delay to `/user` endpoint to see the no. of active connections go up:

   ```ts
   // app.ts
   app.get('/user', async (req, res) => {
     await new Promise((resolve) => setTimeout(resolve, 5000));
     res.send('User data');
   });
   ```

**Implementing Histogram**

1. 
