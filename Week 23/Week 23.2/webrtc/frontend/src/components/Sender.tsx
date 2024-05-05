import { useEffect, useRef, useState } from 'react';

const Sender = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  //as soon as the component mounts, we send a message to the signalling server to identify as a sender
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    setSocket(socket);
    socket.onopen = () => {
      socket.send(JSON.stringify({type: 'sender' }));
    };
  }, []);

  const startSendingVideo = async () => {
    if (!socket) return;

    // 1. we keep listening first from the receiver
    socket.onmessage = async (event) => {
      console.log('event received from receiver', event);
      const message = JSON.parse(event.data);

      if (message.type === 'createAnswer') {
        // if we receive the answer from the receiver, we set it as the remote description on sender's side
        await pc.setRemoteDescription(new RTCSessionDescription(message.sdp));

        // if receiver sends us its ice candidates, we add them to the connection
      } else if (message.type === 'iceCandidate') {
        pc.addIceCandidate(new RTCIceCandidate(message.candidate));
      }
    };

    // 2. create a new RTCPeerConnection
    const pc: RTCPeerConnection = new RTCPeerConnection();

    /* 3.  whenever a change happens (like video/audio gets added), the SDP changes.
       thus we need to keep sending the updated SDP to the receiver */
    pc.onnegotiationneeded = async () => {
      const offer = await pc.createOffer();

      // may seem redundant, but is an important step. we set sender's local description as the offer it will send
      await pc.setLocalDescription(offer);

      // we send the local-description/offer to the signalling server
      socket?.send(JSON.stringify({ type: 'createOffer', sdp: pc.localDescription }));
    };

    // 4. we send ice candidates to the receiver. only gets triggered when video/audio is being sent
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket?.send( JSON.stringify({ type: 'iceCandidate', candidate: event.candidate }));
      }
    };

    getCameraStreamAndSend(pc);
    
  };

  const getCameraStreamAndSend = async (pc: RTCPeerConnection) => {

    // 5. in the end, we add the stream (video) to the connection. (asks for permission to access camera)
    const stream = await navigator.mediaDevices.getUserMedia({ video: true }); //getDisplayMedia for screen sharing

    // add the stream to pc
    pc.addTrack(stream.getVideoTracks()[0], stream);

    if(videoRef.current){
        videoRef.current.srcObject = stream;

        // due to stream fetching causes delay, we play the video after 1 second
        setTimeout(() => {
            videoRef.current && videoRef.current.play();
        }, 1000);
    }
  }; 

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{fontSize: '1.5rem'}}>Sender</span>
      <button onClick={startSendingVideo}> Send Video </button>
      <video width={500} ref={videoRef}></video>
    </div>
  );
};

export default Sender;
