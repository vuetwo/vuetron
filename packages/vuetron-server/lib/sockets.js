// Socket Handling
module.exports = function (server) {
  const io = require("socket.io")(server);
  const diff = require('deep-diff');
  
  // Create the socket connection
  io.on('connection', function (socket) {

    // Holder variable for current state in order to compare differences
    // with new incoming states
    let currentState;

    // Listens for the create of a Vuex Store and saves initial state
    socket.on('clientStateInit', function (state) {
      // Hold initial state in the server
      currentState = state;
      socket.broadcast.emit('setInitState', state);
    });

    // Listens for mutations of the Vuex Store/State
    socket.on('clientStateUpdate', function (state) {
      // Evaluate the difference between previous state and current state
      let mutation = diff(currentState, state);

      // Emit the mutation and state to Vuetron frontend
      socket.broadcast.emit('stateUpdate', mutation, state);

      // Hold the most current state in server
      currentState = state;
    });

  });

  return io;
};