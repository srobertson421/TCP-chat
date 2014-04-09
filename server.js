var net = require('net');

// Create the server
var server = net.createServer();

// Collection of clients sockets
var sockets = [];

// Server connections
server.on('connection', function(socket) {
  console.log('Got a new connection');
  
  // Add to array "sockets"
  sockets.push(socket);
  
  // Event listener for data stream from socket
  socket.on('data', function(data) {
    console.log('Got data:', data);
    
    // Sends socket data to all other sockets in collection
    sockets.forEach(function(otherSocket) {
      if (otherSocket !== socket) {
        otherSocket.write(data);
      }
    });
  });
  
  // Event listener for socket close
  socket.on('close', function() {
    console.log('connection closed');
    var index = sockets.indexOf(socket);
    sockets.splice(index, 1);
  });
});

// Server errors
server.on('error', function(err) {
  console.log('Server error:', err.message);
});

// Server closing
server.on('close', function() {
  console.log('Server closed');
});

// Assign the server a port
server.listen(4001);