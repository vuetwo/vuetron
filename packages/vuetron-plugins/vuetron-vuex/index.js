/* eslint-disable */
const io = require('socket.io-client');

const VuetronVuex = function (port = 9090) {
  return store => {
    // initialize socket connection
    const socket = io('http://localhost:' + port);
    const mutationCache = {};

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
      // loop through all mutations
      for (let i = 0; i < payload.mutationLog.length; i++) {
        // add mutation to mutationCache
        if (!mutationCache[payload.mutationLog[i].type]) mutationCache[payload.mutationLog[i].type] = 0;
        mutationCache[payload.mutationLog[i].type] += 1;
        // recall mutation
        store.commit(payload.mutationLog[i].type, payload.mutationLog[i].payload);
      }
    });

    socket.on('commitClientMutation', function (mutation) {
      if (!mutationCache[mutation.type]) mutationCache[mutation.type] = 0;
      mutationCache[mutation.type] += 1;
      store.commit(mutation.type, mutation.payload);
    });

    // subscribe to store mutations
    store.subscribe((mutation, state) => {
      // check if mutation is in mutationCache
      // if yes, remove from cache
      if (mutationCache[mutation.type]) mutationCache[mutation.type] -= 1;
      // if not, emit update event to server
      else socket.emit('clientStateUpdate', state, mutation);
    });
  };
};

module.exports = VuetronVuex;
/* eslint-enable */