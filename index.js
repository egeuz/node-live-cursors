const express = require('express');
const app = express();
const http = require('http');
const httpServer = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(httpServer); // the actual socket.io object
app.use(express.json());
app.use(express.static('public'));

io.on('connection', socket => {
  // socket = the newly created user connection
  socket.on('mouse-move', (mouseData) => {
    const {id, x, y} = mouseData;
    socket.broadcast.emit('update-mouse-pos', {id, x, y});
  });
});

httpServer.listen(3000, () => console.log("cooking things up @ port 3000"));