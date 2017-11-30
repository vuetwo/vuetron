// Setup basic express server
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const port = process.env.PORT || 9090;
// Import sockets
const io = require('./lib/sockets')(server);

// Routing
app.use(express.static(path.join(__dirname, 'assets')));

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

module.exports = {
  app,
  server
};
