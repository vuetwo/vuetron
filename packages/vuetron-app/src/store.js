import Vue from 'vue';
import Vuex from 'vuex';

const io = require('socket.io-client');

// setup plugin to connect vuex store to server sockets
const VuetronVuex = function (port = 9090) {
  return store => {
    // initialize socket connection
    const socket = io('http://localhost:' + port);

    socket.on('testStateUpdate', function(mutation, state) {
      store.commit('updateClientState', state);
    });
  }
}

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        clientState: null,  //state from client
        // mutations: [],    //history of mutations from client
        messages: ['Store works!', 'Chicken wings are delicious'],
        tests: ['hardCodeTest', 'test2'],
        events: ['connected to app', 'state change', 'state initialized']
    },
    mutations: {
      updateClientState (state, newClientState) {
        state.clientState = newClientState;
      }
    },
    plugins: [VuetronVuex()],
    // mutations: {
        
    // }
});