**Note**: From here is the official commencement of 1-100 Cohort.

# Advanced Backend Communications

## Why do we need multiple servers?

- **Scalability**: As the number of users increases, the server may not be able to handle the load. So, we need multiple servers to distribute the load.

- **Fault Tolerance**: If one server goes down, the other servers can handle the load.

---

## What is Microservices Architecture?

- **Microservices Architecture** is an architectural style that structures an application as a collection of small autonomous services, modeled around a business domain.

- For eg: The main work of handling the payment should be done by primary server, and rest of the work (**asynchronous processes**) like notifications etc. can be done by secondary servers.

---

## What are syncrhonous and asynchronous processes?

- **Synchronous Processes**: The processes that are executed one after the other. Eg: REST API.
  - Here, the client waits for the response from the server.
  - If the server is down, the client will not get the response.
  - The client will get the response only after the server has processed the request.
  - Eg: REST API.

<br>

- **Asynchronous Processes**: The processes that are executed parallelly. Eg: Message Queues.
  - Here, the client does not wait for the response from the server.
  - If the server is down, the client can still send the request.
  - The client will get the response even if the server is down.
  - The client will get the response after the server has processed the request.
  - Eg: Message Queues.

---

## How does Backends communicate with each other?

- **HTTP**: Eg: REST API. This is a synchronous communication.
- **Message Queues**: Eg: RabbitMQ. (asynchronous)
- **WebSockets**: Eg: Socket.io. (asynchronous)
- **gRPC**: Eg: Google RPC. (asynchronous)
- **Pub/Sub**: Eg: Google Pub/Sub. (asynchronous)

<br>

**Is Websockets synchronous or asynchronous?**

- Its a debatable q.
- It can be considered synchronous as it is a two-way communication.
- It can be considered asynchronous as it is a real-time communication.
