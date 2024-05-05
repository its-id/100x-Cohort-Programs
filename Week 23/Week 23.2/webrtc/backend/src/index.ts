import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

let senderSocket: null | WebSocket = null;
let receiverSocket: null | WebSocket = null;

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data: any) {
    const message = JSON.parse(data);

    //identify-as-sender
    if (message.type === 'sender') {
      console.log("sender added");
      senderSocket = ws;

    //identify-as-receiver
    } else if (message.type === 'receiver') {
      console.log("receiver added");
      receiverSocket = ws;

     //if message type is to create the offer, we send the offer to the receiver
    } else if (message.type === 'createOffer') {
      if (ws !== senderSocket) {
        return;
      }
      console.log("sending offer");
      receiverSocket?.send(JSON.stringify({ type: 'createOffer', sdp: message.sdp }));

    //if message type is to create the answer, we send the answer to the sender with receiver's sdp
    } else if (message.type === 'createAnswer') {
        if (ws !== receiverSocket) {
          return;
        }
        console.log("sending answer");
        senderSocket?.send(JSON.stringify({ type: 'createAnswer', sdp: message.sdp }));

    //if iceCandidates are exchanged, we check the sender and receiver and send the ice candidates to the other party
    } else if (message.type === 'iceCandidate') {
      console.log("sending ice candidate")
      if (ws === senderSocket) {
        receiverSocket?.send(JSON.stringify({ type: 'iceCandidate', candidate: message.candidate }));
      } else if (ws === receiverSocket) {
        senderSocket?.send(JSON.stringify({ type: 'iceCandidate', candidate: message.candidate }));
      }
    }

  });
});
