/* eslint-disable */
const io = require('socket.io-client');

const VuetronVuex = function (port = 9090) {
  return store => {
    // initialize socket connection
    const socket = io('http://localhost:' + port);

    // Immediately emit current state in case Vuetron is started first
    socket.emit('clientStateInit', store.state);

    // listen for initial state request from Vuetron
    socket.on('requestClientState', function () {
      // emit initial state to server
      socket.emit('clientStateInit', store.state);
    });

    // listen for state changes from Vuetron and update
    //  app state accordingly
    socket.on('updateClientState', function (payload) {
      // replace state with initial state
      store.replaceState(payload.initState);
      // loop through all mutations, and recall those mutations
      for (let i = 0; i < payload.mutationLog.length; i++) {
        store.commit(payload.mutationLog[i].type, payload.mutationLog[i].payload);
      }
    });
    // socket.on('updateClientState', function (newState) {
    //   // parse the stringified new state passed from Vuetron
    //   let parsedState = JSON.parse(newState);
    //   // replace app's current state with the parsed Vuetron state
    //   store.replaceState(parsedState);
    // });

    // subscribe to store mutations
    store.subscribe((mutation, state) => {
      // on mutation, emit update event to server
      socket.emit('clientStateUpdate', state, mutation);
    });
  };
};

module.exports = VuetronVuex;
/* eslint-enable */