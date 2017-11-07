import Vue from 'vue';
import Vuex from 'vuex';

const io = require('socket.io-client');

// setup plugin to connect vuex store to server sockets
const VuetronVuex = function (port = 9090) {
  return store => {
    // initialize socket connection
    const socket = io('http://localhost:' + port);

    // request current client state on socket connection
    socket.emit('requestClientState');

    socket.on('setInitState', function(state) {
      store.commit('updateClientState', state);
    });

    // listen for state changes from client and update
    //  vuetron's client state store accordingly along
    //  with mutation log
    socket.on('stateUpdate', function(mutation, newState){
      console.log('got state update', mutation, newState);
      // // add mutation to mutation log
      // // store.state.mutations.unshift(mutation);
      // let updatedState = {
      //   title: 'STATE CHANGE',
      //   mutation: mutation,
      //   newState: newState
      // };
      // store.state.events.unshift(updatedState);
      // // update client's current state to newState
      // store.state.clientState = newState;
    });

    socket.on('sendEvent', function(event){
      console.log('got new event', event);
      // store.state.events.unshift(event);
    });


    //TESTING WITH DUMMY DATA:

    //get state change:
    socket.on('sendMutation', function(mutation, newState){
      let updatedStateItem = {
        title: 'STATE CHANGE',
        display: JSON.stringify(mutation),
        newState: JSON.stringify(newState)
      };
      store.state.events.unshift(updatedStateItem);
    });

    //get client event:
    socket.on('sendClientEvent', function(type, payload){
      let clientStateItem = {
        title: 'ACTION',
        display: JSON.stringify(payload),                
        type: type
      }
      store.state.events.unshift(clientStateItem);
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
        clientState: null,  //state from client
        events: [{title:'CONNECTED TO APP'}, {title:'STATE INITIALIZED'}]
    },
    mutations: {
      updateClientState (state, newClientState) {
        state.clientState = newClientState;
      }
    },
    plugins: [VuetronVuex()],
});