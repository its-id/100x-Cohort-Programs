import { useEffect, useState } from 'react';
import css from './App.module.css';

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Array<string>>([]);
  const [sendMsg, setSendMsg] = useState<string>('');

  // Connect to the WebSocket server
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('Connected to server');
      setSocket(socket);
    };

    socket.onmessage = (event) => {
      console.log('Message:', event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    return () => {
      socket.close();
    };
  }, []);

  if (!socket) return <div>Connecting to Socker Server...</div>;

  return (
    <div className={css.container}>
      <div className={css.msgsContainer}>
        {messages.map((message, index) => (
          <p className={css.msg} key={index}>
            {message}
          </p>
        ))}
      </div>

      <div className={css.msgForm}>
        <input
          value={sendMsg}
          type='text'
          onChange={(e) => setSendMsg(e.target.value)}
        />

        {/* send the message to server */}
        <button
          onClick={() => {
            socket.send(sendMsg);
            setSendMsg('');
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
