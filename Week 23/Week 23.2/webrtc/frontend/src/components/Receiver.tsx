import { useEffect, useRef } from 'react';

const Receiver = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  //as soon as the component mounts, we send a message to the signalling server to identify as a receiver
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: 'receiver' }));
    };
    startReceiving(socket);
  }, []);

  const startReceiving = async (socket: WebSocket) => {
    if (!socket) return;

    // 1. create a new RTCPeerConnection
    const pc = new RTCPeerConnection();

    socket.onmessage = async (event) => {
      console.log('reading messages from sender', event);
      const message = JSON.parse(event.data);

      if (message.type === 'createOffer') {
        // 2. if we receive the offer from the sender, we set it as the remote description on receiver's side
        await pc.setRemoteDescription(new RTCSessionDescription(message.sdp));

        // receiver creates an answer
        const answer = await pc.createAnswer();
        pc.setLocalDescription(answer);

        // sends the answer to the signalling server, which will send it to the sender
        socket.send(JSON.stringify({ type: 'createAnswer', sdp: answer }));

        // 3. send ice candidates to the sender
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            socket.send(
              JSON.stringify({
                type: 'iceCandidate',
                candidate: event.candidate,
              })
            );
          }
        };
      } else if (message.type === 'iceCandidate') {
        // 4. if we get the ice candidates from the sender, we add them to the connection
        pc.addIceCandidate(new RTCIceCandidate(message.candidate));
      }
    };

    // 5. checking if the video is being received
    pc.ontrack = (event) => {
      console.log('getting the video from the sender', event);

      //6. add it to the video element
      if (videoRef.current) {
        videoRef.current.srcObject = new MediaStream([event.track]);
        videoRef.current.controls = true;

        // due to stream fetching causes delay, we play the video after 1 second
        videoRef.current && videoRef.current.play();
      }
    };
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <span style={{ fontSize: '1.5rem' }}>Receiver</span>
      <span>If video doesn't start automatically, click on play button.</span>
      <video autoPlay width={500} ref={videoRef}></video>
    </div>
  );
};

export default Receiver;
