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

    socket.on('setInitState', function (state) {
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
    socket.on('stateUpdate', function (mutation, newState) {
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
      // check if any of the mutations are subscribed
      for (let change of mutation) {
        const stringifiedPath = JSON.stringify(change.path);
        // if subscribed, push to that path's array for display
        for (let key of Object.keys(store.state.subscriptions)) {
          if (key === stringifiedPath) {
            store.commit('addEventToSubscription', mutation.path);
          }
        }
      }
    });

    //get state change:
    socket.on('dummyMutations', function(mutation, newState){
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
    });
  };
};

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    clientState: {},  // state from client
    events: [],
    subscriptions: {
      /*
      formatted as:
      stringified path array: [array of previous values of the property, listed, in, order]
      another path array: [array, listed, in, order]
      */
    }
  },
  mutations: {
    updateClientState (state, newClientState) {
      state.clientState = newClientState;
    },
    addNewEvent (state, newEvent) {
      if (!newEvent.title || !newEvent.display) throw new Error('invalid event data');
      if (!newEvent.show) newEvent.show = false;
      state.events.unshift(newEvent);
    },
    toggleEventShow (state, evIdx) {
      state.events[evIdx].show = !state.events[evIdx].show;
    },
    addSubscription (state, path) {
      const stringifiedPath = JSON.stringify(path);
      if (!state.subscriptions.hasOwnProperty(stringifiedPath)) {
        state.subscriptions = path;
      }
    },
    removeSubscription (state, path) {
      const stringifiedPath = JSON.stringify(path);
      if (!state.subscriptions.hasOwnProperty(stringifiedPath)) {
        delete state.subscriptions.stringifiedPath;
      }
    },
    addEventToSubscription (state, path) {
      eval('state.subscription[key].push(state.' + path.join('.')); // eslint-disable-line
    }
  },
  plugins: [VuetronVuex()]
});
