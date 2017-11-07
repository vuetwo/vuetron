import Vue from 'vue';
import Vuex from 'vuex';

const io = require('socket.io-client');

// setup plugin to connect vuex store to server sockets
const VuetronVuex = function (port = 9090) {
  return store => {
    // initialize socket connection
    const socket = io('http://localhost:' + port);
    // register event noting connection to sockets (client app)
    let initEvent = {
      title: 'CONNECTED TO APP',
      display: {
        msg: 'Successfully connected Vuetron to client'
      }
    };
    store.commit('addNewEvent', initEvent);

    // request current client state on socket connection
    socket.emit('requestClientState');

    socket.on('setInitState', function(state) {
      let event = {
        title: 'STATE INITIALIZED',
        display: state
      };
      // register event noting receipt of initial client state
      store.commit('addNewEvent', event);
      // initialize client state value
      store.commit('updateClientState', state);
    });

    // listen for state changes from client and update
    //  vuetron's client state store accordingly along
    //  with mutation log
    socket.on('stateUpdate', function(mutation, newState){
      let updatedState = {
        title: 'STATE CHANGE',
        display: {
          mutation: mutation,
          newState: JSON.stringify(newState),
        }
      };
      // register event for state change
      store.commit('addNewEvent', updatedState);
      // update client's current state to newState
      store.commit('updateClientState', newState);
    });

    // socket.on('sendEvent', function(event){
    //   console.log('got new event', event);
    //   // store.state.events.unshift(event);
    // });


    // //TESTING WITH DUMMY DATA:

    // //get state change:
    // socket.on('sendMutation', function(mutation, newState){
    //   let updatedStateItem = {
    //     title: 'STATE CHANGE',
    //     display: JSON.stringify(mutation),
    //     newState: JSON.stringify(newState)
    //   };
    //   store.commit('addNewEvent', updatedStateItem);
    // });

    // //get client event:
    // socket.on('sendClientEvent', function(type, payload){
    //   let clientStateItem = {
    //     title: 'ACTION',
    //     display: JSON.stringify(payload),                
    //     type: type
    //   }
    //   store.commit('addNewEvent', clientStateItem);
    // });

    // // subscribe to store mutations
    // store.subscribe((mutation, state) => {
    //   // on mutation, check if mutation is updating
    //   // client's state
    //     // if so, emit update event to server
    //       // socket.emit('vuetronStateUpdate', state);
    // })
  }
}

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        clientState: {},  //state from client
        events: []
    },
    mutations: {
      updateClientState (state, newClientState) {
        state.clientState = newClientState;
      },
      addNewEvent(state, newEvent) {
        if(!newEvent.title || !newEvent.display) throw new Error('invalid event data');
        if(!newEvent.show) newEvent.show = false;
        state.events.unshift(newEvent);
      },
      toggleEventShow(state, evIdx){
        state.events[evIdx].show = !state.events[evIdx].show;
      },
    },
    plugins: [VuetronVuex()],
});