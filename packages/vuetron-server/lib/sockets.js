// Socket Handling
module.exports = function (server) {
  const io = require('socket.io')(server);
  const diff = require('deep-diff');

  // Create the socket connection
  io.on('connection', function (socket) {
    // Holder variable for current state in order to compare differences
    // with new incoming states
    let currentState;

    // Listen for request for client state from Vuetron
    socket.on('requestClientState', function () {
      // If we have yet to store a state from client
      if (!currentState) {
        // emit event to request the current state.
        socket.broadcast.emit('requestClientState');
      } else {
        // otherwise just respond with currently cached state
        socket.broadcast.emit('setInitState', currentState);
      }
    });

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

    socket.on('vuetronStateUpdate', function (state) {
      // Update currentState to Vuetron state update
      currentState = state;
      // Pass reverted/changed state back to client
      socket.broadcast.emit('updateClientState', state);
    });

    socket.on('clientEmitEvent', function (event) {
      // Pass new emitted event from user app to Vuetron frontend
      socket.broadcast.emit('eventUpdate', event);
    });
  });

  return io;
};
