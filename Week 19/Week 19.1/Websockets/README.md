## WebSockets

they provide a way to establish a **persistant connection** between the client and the server.

**Why is it so important?**

- used by the server to communicate with the browser.
- provides a full-duplex communication channel over a single TCP connection. In simple words, a **persistant connection is established**.

<br>

**Why is it more preferred over HTTP?**

- In HTTP, server can't send the data to the browser until the browser sends the request.
- But in WebSockets, the server can send the data to the browser without waiting for a request.

<br>

**But, why do we need servers to send the data to the client?**

- In cases of exchanges, like stock market. If we do it using HTTP, the client will have to send the request to the server every time to get the updated data. (which is not efficient)
- On top of that, a three way handshake is required to establish the connection.
- In total, a lot of _overhead_ is there. Imagine the same thing happening with 1000s of clients.
- Thus, WebSockets are a better choice in such cases.

<br>

- Another way to achieve this is **Polling**. But it is not efficient as it sends the request to the server at regular intervals. (which is not efficient)
- Eg: Leetcode does it when you are waiting for the result of your submission.

---

## Websockets in Node.js

- [Websockets](https://www.npmjs.com/package/websockets).

- [ws](https://www.npmjs.com/package/ws).

- [socket.io](https://www.npmjs.com/package/socket.io).
  - benefits: easier to use, rooms, namespaces, etc.
  - one down side is that it is not a standard. It is a library that is built on top of Websockets.
  - For eg: if we want to use socket.io implementation for a rust server, it should be available in that language.

---

## Implementing Websockets in Node.js

- Go to `1. Websockets/backend-ws` folder.

  <br>

  **If using the Template**:

  - `npm install`
  - `tsc -b`
  - `node dist/server.js`
  - Go to [Hopscotch](https://hoppscotch.io/realtime/websocket) and paste URL as `ws://localhost:8080`.
  - Send a message from different connections and see the response.

    <br>

    <img width="1446" alt="Screenshot 2024-04-06 at 9 17 14 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/ccac3ba6-6f7f-415e-afaa-e60dc3eb118a"> <br/>
    
    <img width="570" alt="Screenshot 2024-04-06 at 8 23 19 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/0aa4f86e-5712-4a7d-b039-1b16f031baa2">


  <br>

  **If Self-Setup**:

  - `npm init -y`
  - `npx tsc --init`
  - `npm i ws @types/ws`

<br>

**Note**: The first connection that the server creates is an HTTP request. After that, it upgrades the connection to a Websocket connection.

---

## Websockets on Client Side

- For interacting with websocket server on client side, we use the `websocket` api.

<br>

- Go to `1. Websockets/frontend` folder.
  **If using the Template**:

  - `npm install`
  - `npm start`
  - Go to `http://localhost:5173` and open the console.
  - Cleanup & Setup Websocket code in `src/App.tsx`.
  - Send a message from different connections and see the response.

  **If Self-Setup**:

  - `npx create-vite@latest frontend`
  - `cd frontend`
  - `npm install`
  - Complete the Websocket Setup & run the server.

---

## Some Scenarios to consider when scaling Websockets

- websockets are scaled horizontally.
- if we have two user in same room connected to different websockets, then we can consider two scenarios:

  - we can have all same room users to connect to same server.
    - not a better way.
    - easier to scale but limited to the server capacity.
  - we can divide servers as per the regions and then connect the users to the server of their region.
    - better way.
    - a bit complex to implement.
    - we can connect the servers using pub/sub using the subcription model.

A repo to explore more about [Websockets](https://github.com/hkirat/real-time-chat/tree/master)
