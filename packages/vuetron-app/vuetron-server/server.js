// Setup basic express server
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 9090;
// Import sockets
const io = require('./lib/sockets')(server);

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

module.exports = {
  app,
  server
};
