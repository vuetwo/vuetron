import Vue from 'vue';
import Vuex from 'vuex';

const pathParser = (str) => {
  return str.split(/[^A-Za-z0-9]/).filter(elem => elem !== null && elem !== '').join('.');
};

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
        const parsedPath = pathParser(JSON.stringify(change.path));
        // if subscribed, push to that path's array for display
        for (let key of Object.keys(store.state.subscriptions)) {
          if (key === parsedPath || parsedPath.search(key) !== -1) {
            store.commit('addEventToSubscription', {key, change});
          }
        }
      }
    });
  };
};

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    clientState: {},  // state from client
    events: [],
    subscriptions: {}
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
    addSubscription (state, str) {
      let path = pathParser(str);
      if (!state.subscriptions.hasOwnProperty(path)) {
        state.subscriptions[path] = [];
      }
    },
    removeSubscription (state, path) {
      let subs = Object.assign({}, state.subscriptions);
      if (subs.hasOwnProperty(path)) {
        delete subs[path];
        state.subscriptions = subs;
      }
    },
    addEventToSubscription (state, info) {
      let subs = Object.assign({}, state.subscriptions);
      subs[info.key].push(info.change);
      state.subscriptions = subs;
    }
  },
  plugins: [VuetronVuex()]
});
