import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [typingText, setTypingText] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const endRef = useRef(null);

  useEffect(() => {
    socket.on('system-message', (msg) => {
      setMessages((prev) => [...prev, { type: 'system', message: msg }]);
    });

    socket.on('receive-message', (msgData) => {
      setMessages((prev) => [...prev, { type: 'user', ...msgData }]);
    });

    socket.on('typing', (text) => {
      setTypingText(text);
    });

    socket.on('online-users', (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off('system-message');
      socket.off('receive-message');
      socket.off('typing');
      socket.off('online-users');
    };
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingText]);

  const joinChat = () => {
    if (!username.trim()) return;
    socket.emit('join', username);
    setJoined(true);
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit('send-message', {
      username,
      message
    });

    socket.emit('stop-typing');
    setMessage('');
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);

    if (e.target.value.trim()) {
      socket.emit('typing', username);
    } else {
      socket.emit('stop-typing');
    }
  };

  if (!joined) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h1>Enter Chat</h1>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={joinChat}>Enter Chat</button>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-wrapper">
      <div className="chat-box">
        <div className="chat-header">
          <h1>Chat Room</h1>
          <p>Online: {onlineUsers.length} {onlineUsers.join(', ')}</p>
        </div>

        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={msg.type === 'system' ? 'system-msg' : 'user-msg'}>
              {msg.type === 'system' ? (
                <p>{msg.message}</p>
              ) : (
                <div>
                  <strong>{msg.username}</strong>: {msg.message}
                  <span className="time"> {msg.time}</span>
                </div>
              )}
            </div>
          ))}

          {typingText && <div className="typing">{typingText}</div>}
          <div ref={endRef}></div>
        </div>

        <div className="input-area">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={handleTyping}
            onKeyDown={(e) => {
              if (e.key === 'Enter') sendMessage();
            }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;