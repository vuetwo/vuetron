const io = require('socket.io-client');

const VuetronVuex = store => {
  
      const socket = io('http://localhost:3000');
      // socket.on('connect', () => {
          socket.emit('state', store.state);
          // console.log('emitted');
      // });
      console.log('initial state', store.state);
      console.log('initial store', store.state);

      store.subscribe((mutation, state) => {
        socket.emit('updateState', state);
          console.log('mutation', mutation);
          console.log('state', state);
          // The mutation comes in the format of `{ type, payload }`.
      })
  }

module.exports = VuetronVuex;