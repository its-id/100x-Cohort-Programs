import WebSocket, { WebSocketServer } from 'ws';

// HTTP SERVER IMPLEMENTATION
import http from 'http';

const server = http.createServer(function (request: any, response: any) {
  console.log(new Date() + ' Received request for ' + request.url);
  response.end('hi there');
});

const wss = new WebSocketServer({ server });
let userCount = 0;

//whenever a connection is established, the callback function is called with a ws object
wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  console.log('user connected', ++userCount);
  ws.on('message', function message(data, isBinary) {
    //For every client connected to the server, the server sends the message to all the clients

    // console.log('recieved %s', data);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary }); //first parameter is the message, second parameter is an object with a binary key set to true if the message is binary
      }
    });
  });

  ws.send('Hello! Message From Server!!'); //send a message to the client
});

server.listen(8080, function () {
  console.log(new Date() + ' Server is listening on port 8080');
});
