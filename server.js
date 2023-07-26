const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path'); // Import the 'path' module

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Set the path to the Vue.js build directory
const staticPath = path.join(__dirname, 'client', 'dist');
app.use(express.static(staticPath));
// app.use(express.static('client/dist'));

// Handle socket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle 'message' event
  socket.on('message', (data) => {
    console.log('Received message:', data);

    // Emit 'serverMessage' event with a response
    io.emit('serverMessage', { text: 'Message received on the server.'+' '+data.text});
  });

  // Handle socket disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
