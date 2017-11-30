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
        // otherwise emit connected event and
        //  just respond with currently cached state
        socket.broadcast.emit('clientAppConnected');
        socket.broadcast.emit('setInitState', currentState);
      }
    });

    // Listen for notification of client connection
    socket.on('clientConnected', function () {
      socket.broadcast.emit('clientAppConnected');
    });

    // Listens for the create of a Vuex Store and saves initial state
    socket.on('clientStateInit', function (state) {
      // Hold initial state in the server
      currentState = state;
      socket.broadcast.emit('setInitState', state);
    });

    // Listens for mutations of the Vuex Store/State
    socket.on('clientStateUpdate', function (updatedState, mutation) {
      // Evaluate the difference between previous state and current state
      let changes = diff(currentState, updatedState);

      // Emit the mutation and state to Vuetron frontend
      socket.broadcast.emit('stateUpdate', changes, mutation, updatedState);

      // Hold the most current state in server
      currentState = updatedState;
    });

    socket.on('vuetronStateUpdate', function (payload) {
      // Update currentState to Vuetron state update
      // currentState = state;
      // Pass reverted/changed state back to client
      socket.broadcast.emit('updateClientState', payload);
    });

    socket.on('vuetronMutateState', function (payload) {
      // Trigger client mutation from Vuetron
      // Pass mutation payload back to client
      socket.broadcast.emit('commitClientMutation', payload);
    });

    socket.on('clientEmitEvent', function (event) {
      // Pass new emitted event from user app to Vuetron frontend
      socket.broadcast.emit('eventUpdate', event);
    });

    socket.on('clientDomTree', function (dom) {
      // Pass dom tree from user app to Vuetron frontend
      socket.broadcast.emit('domUpdate', dom);
    });

    socket.on('sendFetchResponse', function (response) {
      // Pass response from FETCH request
      socket.broadcast.emit('apiRequestResponse', response);
    });
  });

  return io;
};
