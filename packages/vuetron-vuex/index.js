const io = require('socket.io-client');

const VuetronVuex = function (port = 9090) {
  return store => {
    // initialize socket connection
    const socket = io('http://localhost:' + port);

    // emit initial state to server
    socket.emit('clientStateInit', store.state);

    // subscribe to store mutations
    store.subscribe((mutation, state) => {
      // on mutation, emit update event to server
      socket.emit('clientStateUpdate', state);
    })
  }
}

module.exports = VuetronVuex;