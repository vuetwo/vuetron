const pathParser = (str) => {
  return str.split(/[^A-Za-z0-9]/).filter(elem => elem !== null && elem !== '').join('.');
};

const idGenerator = () => {
  let counter = 0;
  return function () {
    counter++;
    return counter;
  };
};

const io = require('socket.io-client');

// setup plugin to connect vuex store to server sockets
const SocketPlugin = function (port = 9090) {
  return store => {
    const getId = idGenerator();
    // initialize socket connection
    const socket = io('http://localhost:' + port);
    // register event noting connection to sockets (client app)
    let initEvent = buildEvent(getId(), 'CONNECTED TO SERVER', 'Successfully connected Vuetron to server.');
    store.commit('addNewEvent', initEvent);

    // request current client state on socket connection
    // if (Object.keys(store.state.clientState).length < 1) {
    //   socket.emit('requestClientState');
    // }

    socket.on('clientAppConnected', function () {
      let event = buildEvent(getId(), 'CLIENT APP CONNECTED', 'Successfully connected to client application.');
      store.commit('addNewEvent', event);
    });

    socket.on('setInitState', function (state) {
      let event = buildEvent(getId(), 'STATE INITIALIZED', state);
      // register event noting receipt of initial client state
      store.commit('addNewEvent', event);
      // initialize client state value
      store.commit('updateClientState', state);
    });

    // listen for state changes from client and update
    //  vuetron's client state store accordingly along
    //  with mutation log
    socket.on('stateUpdate', function (changes, mutation, newState) {
      let updatedState = buildEvent(getId(), 'STATE CHANGE', {'changes': changes});
      // add mutations
      updatedState.mutation = mutation;
      // add newState
      updatedState.state = JSON.stringify(newState);
      // register event for state change
      store.commit('addNewEvent', updatedState);
      // update client's current state to newState
      store.commit('updateClientState', newState);
      // check if any of the mutations are subscribed
      if (changes) {
        for (let change of changes) {
          const parsedPath = pathParser(JSON.stringify(change.path));
          // if subscribed, push to that path's array for display
          for (let key of Object.keys(store.state.subscriptions)) {
            if (key === parsedPath || parsedPath.search(key) !== -1) {
              store.commit('addEventToSubscription', { key, change });
            }
          }
        }
      }
    });

    socket.on('eventUpdate', function (event) {
      let newEvent = buildEvent(getId(), 'EVENT EMITTED', event);
      store.commit('addNewEvent', newEvent);
    });

    socket.on('domUpdate', function (dom) {
      store.commit('updateClientDom', dom);
    });

    // listen for API responses made from FETCH requests and add to Event Stream
    socket.on('apiRequestResponse', function (response) {
      const display = {
        requestObj: response.requestConfig.slice(0),
        responseObj: response
      };
      delete display.responseObj.requestConfig;
      const apiEvent = buildEvent(getId(), 'API REQUEST / RESPONSE', display);
      store.commit('addNewEvent', apiEvent);
    });
  };
};

// Build events for display in EventStream
function buildEvent (id, title, display, hidden = {}) {
  const eventObj = {
    id,
    title,
    display,
    hidden,
    status: 'active',
    timestamp: new Date(Date.now()).toISOString()
  };
  return eventObj;
}

module.exports = SocketPlugin;
