## Today's Topics

**Server**:

- Cluster Module and Horizontal Scaling
- Capacity Estimation, ASGs and Vertical Scaling
- Load Balancers

**Database**:

- Indexing

---

## Single Threaded vs Multi-Threaded

- Single-threaded only uses one core of the CPU
- Can't handle parallel tasks
- If we try to run different node.js processes, we encounter port conflicts.
- Eg: Node.js, Python, Ruby etc.

**Q. If JS in single-threaded, how does it handle asynchronous tasks?**
**Ans**. It uses the event loop to handle asynchronous tasks. When multiple async tasks come one by one, JS puts the web api calls to a seperate stack (thread) and by the time the response comes, it keeps working on next tasks. When the response comes, it puts the callback in the callback queue and the event loop keeps checking the callback queue and executes the callback when the stack is empty.

- Multi-threaded can use multiple cores of the CPU
- Can parallelize tasks into multiple threads to be run on multiple cores
- But, paralelization doesn't happen automatically by the language. It has to be implemented by the developer.
- For eg: If we want to calculate the sum upto 10000, we divide the job into 10 parts to be run on 10 threads. Each thread calculates the sum till 1000 numbers and then the main thread adds the sum of all the threads.
- Eg: Java, GoLang, Rust etc.

---


another reason of getting its because of round-robin scheduling and the lack of inherent session management in Node.js


## Practical Example of Single Threaded vs Multi-Threaded

- Run a simple program in Node.js to run an infinite loop.
  ```js
  while (true) {
    console.log('Hello');
  }
  ```
- Check the CPU usage in the Task Manager or by running following command in terminal:

  ```bash
  top
  ```

  You will notice one of the cores of the CPU is being used 100% by the Node.js process.

<br>

**Q. How does multi-threaded help in these situations?**

- Help us utilize multiple cores of the CPU
- Lets us interact multiple threads with one another.

- Now, try running the same program in Rust:

  ```rust
  use std::thread;

  fn main() {
      // Spawn three threads
      for _ in 0..3 {
          thread::spawn(|| {
              let mut counter: f64 = 0.00;
              loop {
                  counter += 0.001;
              }
          });
      }

      loop {
          // Main thread does nothing but keep the program alive
      }
  }
  ```

- To run the above program, you need to install Rust and Cargo. You can install it from [here](https://www.rust-lang.org/tools/install). Then run the following command:

  ```bash
  cargo run
  ```

- You will notice that the CPU usage is not 100% for a single core but around 25% spreaded across multiple cores.

<br>

**Quick Fact**: We can also utilize multiple cores in Node.js using:

1. the `cluster` module.
2. spawning other processes.

---

## Why do we need Scaling?

- To handle the load and traffic of the application
- Helps us increase the memory/size (CPUs) of the server or number of servers themselves.

---

## Vertical Scaling

- Increasing the memory and CPU of the server
- It has a limit and can be expensive
- Node.js is single-threaded, so it can't utilize multiple cores
- Thus, vertical scaling is not very effective for Node.js

---

## Horizontal Scaling

- Increasing the number of servers
- Can handle more traffic and load
- Can be done using:
  1. Load Balancers
  2. Auto Scaling Groups (ASGs)

### Implementing Horizontal Scaling in Node.js project

**Ugly Way**:
Run multiple node.js processes on terminal.

**Issues**:

- Port conflicts
- Keep track of all the processes

**Better Way**: Using the `cluster` module.

1. Go to the `/programs/express-app` directory.
2. Check the following code to see the working of the `cluster` module.
3. In the code, we try to start the primary server.
4. Inside the primary server, we check if the server is the master or worker.
5. If it is the master, we fork the workers.
6. If it is the worker, we start an express server. Here, we will not have port conflicts as each worker will have a different port.
7. Try running the code using the following command:

   ```bash
   node index.js
   ```

8. Notice different workers getting initialized with running on different cores with unique process ids.

---

## Capacity Estimation

- Helps us estimate the capacity of the server required to handle the load.
- Helps us decide whether to go for vertical or horizontal scaling.

**Common System Design Questions**:

1. How would you scale your application?
2. How do you handle spikes?
3. How can you support a certain SLA(Service Level Agreement) given some traffic?

**Ans**: We can do some scenario based calculations:

1. If we have 1M users, 1 user sends 10 req/sec, then we need to handle 10M req/sec.

- Estimate the Reqs/sec to be handled by one server:
  - If one server can handle 100 req/sec, then we need 100 servers.

2. To handle spikes:

- Assuming we have monitoring enabled.
- We can set ASGs with conditions like:
  - If CPU usage is more than 70%, then add 10 more servers.
  - If CPU usage is less than 30%, then remove 10 servers.
- We can also have a buffer of 20% extra servers to handle spikes.

3. For Realtime applications:

- Now, we don't have requests per seconds, but we have persistent connections which is expensive.
- Here the metric is not the no. of requests, its the number of connections.
- Some complexities to handle:
  - If server needs to scale up, it needs to handle the existing connections: probably through some client-side logic to end and reconnect the connection.
  - If server needs to scale down, needs to handle existing connections: probably through some logic to transfer the connections to another server.

4. For CPU Intensive tasks like:

- Youtube: Here the transcoding is CPU intensive.
- Replit: Here the code execution is CPU intensive.
- Live Streaming of matches

- Here, we have some options to scale up:
  - Using ASGs to add more servers when the queue of tasks starts increasing a certain limit.
    **Downsides**:
    - Not a good option for replit, even Hotstar uses it.
  - Keeping a certain size of **warm pool** ready for connection.
    **Downsides**:
    - we are restricting the cpu usage to a certain limit.
    - good option for replit.
