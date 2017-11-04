import Vue from 'vue';
import Vuex from 'vuex';

const io = require('socket.io-client');

// setup plugin to connect vuex store to server sockets
const VuetronVuex = function (port = 9090) {
  return store => {
    // initialize socket connection
    const socket = io('http://localhost:' + port);

    // emit initial state to server
    socket.emit('vuetronStateUpdate', store.state);

    // listen for state changes from client and update
    //  vuetron's client state store accordingly along
    //  with mutation log
    socket.on('stateUpdate', function(mutation, newState){
      // add mutation to mutation log
      // store.state.mutations.unshift(mutation);
      store.state.events.unshift(mutation);
      // update client's current state to newState
      store.state.clientState = newState;
    });

    socket.on('sendEvent', function(event){
      store.state.events.unshift(event);
    });

    socket.on('sendMutation', function(mutation){
      store.state.events.unshift(mutation);
    });

    // subscribe to store mutations
    store.subscribe((mutation, state) => {
      // on mutation, check if mutation is updating
      // client's state
        // if so, emit update event to server
          // socket.emit('vuetronStateUpdate', state);
    })
  }
}

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        clientState: {key: 'value'},  //state from client
        // mutations: [],    //history of mutations from client
        messages: ['Store works!', 'Chicken wings are delicious'],
        tests: ['hardCodeTest', 'test2'],
        events: ['connected to app', 'state change', 'state initialized']
    },
    plugins: [VuetronVuex()],
    // mutations: {
        
    // }
});