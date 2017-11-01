const io = require('socket.io-client');

const VuetronVuex = store => {

    // initialize socket connection
    const socket = io('http://localhost:3000');

    // emit initial state to server
    socket.emit('clientStateInit', store.state);

    // subscribe to store mutations
    store.subscribe((mutation, state) => {
        // on mutation, emit update event to server
        socket.emit('clientStateUpdate', state);
    })
}

module.exports = VuetronVuex;