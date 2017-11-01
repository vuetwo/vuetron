const io = require('socket.io-client');

const VuetronVuex = store => {

    // initialize socket connection
    const socket = io('http://localhost:3000');

    // emit initial state to server
    socket.emit('clientStateInit', store.state);
    console.log('initial state', store.state);
    console.log('initial store', store.state);

    // subscribe to store mutations
    store.subscribe((mutation, state) => {
        // on mutation, emit update event to server
        socket.emit('clientStateUpdate', state);
        console.log('mutation', mutation);
        console.log('state', state);
    })
}

module.exports = VuetronVuex;