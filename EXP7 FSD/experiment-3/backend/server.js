const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

let users = {};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join', (username) => {
    users[socket.id] = username;

    io.emit('system-message', `${username} joined the chat`);
    io.emit('online-users', Object.values(users));
  });

  socket.on('send-message', (data) => {
    io.emit('receive-message', {
      username: data.username,
      message: data.message,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    });
  });

  socket.on('typing', (username) => {
    socket.broadcast.emit('typing', `${username} is typing...`);
  });

  socket.on('stop-typing', () => {
    socket.broadcast.emit('typing', '');
  });

  socket.on('disconnect', () => {
    const username = users[socket.id];
    delete users[socket.id];

    if (username) {
      io.emit('system-message', `${username} left the chat`);
      io.emit('online-users', Object.values(users));
    }

    console.log('User disconnected:', socket.id);
  });
});

server.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});