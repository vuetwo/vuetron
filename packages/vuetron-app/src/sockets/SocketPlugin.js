const pathParser = (str) => {
  return str.split(/[^A-Za-z0-9]/).filter(elem => elem !== null && elem !== '').join('.');
};

const io = require('socket.io-client');

// setup plugin to connect vuex store to server sockets
const SocketPlugin = function (port = 9090) {
  return store => {
    // initialize socket connection
    const socket = io('http://localhost:' + port);
    // register event noting connection to sockets (client app)
    let initEvent = buildEvent('CONNECTED TO SERVER', 'Successfully connected Vuetron to server.');
    store.commit('addNewEvent', initEvent);

    // request current client state on socket connection
    // if (Object.keys(store.state.clientState).length < 1) {
    //   socket.emit('requestClientState');
    // }
    socket.on('setInitState', function (state) {
      let event = buildEvent('STATE INITIALIZED', state);
      // register event noting receipt of initial client state
      store.commit('addNewEvent', event);
      // initialize client state value
      store.commit('updateClientState', state);
    });

    // listen for state changes from client and update
    //  vuetron's client state store accordingly along
    //  with mutation log
    socket.on('stateUpdate', function (changes, mutation, newState) {
      let updatedState = buildEvent('STATE CHANGE', {'changes': changes});
      // add mutations
      updatedState.mutation = mutation;
      // add newState
      updatedState.state = JSON.stringify(newState);
      // register event for state change
      store.commit('addNewEvent', updatedState);
      // update client's current state to newState
      store.commit('updateClientState', newState);
      // check if any of the mutations are subscribed
      for (let change of changes) {
        const parsedPath = pathParser(JSON.stringify(change.path));
        // if subscribed, push to that path's array for display
        for (let key of Object.keys(store.state.subscriptions)) {
          if (key === parsedPath || parsedPath.search(key) !== -1) {
            store.commit('addEventToSubscription', { key, change });
          }
        }
      }
    });

    socket.on('eventUpdate', function (event) {
      let newEvent = buildEvent('EVENT EMITTED', event);
      store.commit('addNewEvent', newEvent);
    });

    socket.on('domUpdate', function (dom) {
      store.commit('updateClientDom', dom);
    });

    // listen for API responses made from FETCH requests and add to Event Stream
    socket.on('apiRequestResponse', function (response) {

      let apiResponse = buildEvent('API RESPONSE', { url: response.url, redirected: response.redirected, method: response.requestObject[0].method });
  
      apiResponse.requestObj = response.requestObject

      delete response.requestObject;
      apiResponse.responseObj = response;
      
      store.commit('addFetchResponseToEvents', apiResponse);      
    });
  };
};


function buildEvent (title, display, hidden) {
  // console.log('DISPLAYINOBJ:', display);
  eventObj = {
    title: title,
    display: display,
    status: 'active',
    timestamp: new Date(Date.now()).toISOString(),
  }
  console.log('EVENT OBJECT:', eventObj);
  return eventObj;
}

module.exports = SocketPlugin;







// const pathParser = (str) => {
//   return str.split(/[^A-Za-z0-9]/).filter(elem => elem !== null && elem !== '').join('.');
// };

// const io = require('socket.io-client');

// // setup plugin to connect vuex store to server sockets
// const SocketPlugin = function (port = 9090) {
//   return store => {
//     // initialize socket connection
//     const socket = io('http://localhost:' + port);
//     // register event noting connection to sockets (client app)
//     let initEvent = {
//       title: 'CONNECTED TO SERVER',
//       display: 'Successfully connected Vuetron to server.',
//       status: 'active',
//       timestamp: new Date(Date.now()).toISOString()
//     };
//     store.commit('addNewEvent', initEvent);

//     // request current client state on socket connection
//     // if (Object.keys(store.state.clientState).length < 1) {
//     //   socket.emit('requestClientState');
//     // }

//     socket.on('setInitState', function (state) {
//       let event = {
//         title: 'STATE INITIALIZED',
//         display: state,
//         status: 'active',
//         timestamp: new Date(Date.now()).toISOString()
//       };
//       // register event noting receipt of initial client state
//       store.commit('addNewEvent', event);
//       // initialize client state value
//       store.commit('updateClientState', state);
//     });

//     // listen for state changes from client and update
//     //  vuetron's client state store accordingly along
//     //  with mutation log
//     socket.on('stateUpdate', function (changes, mutation, newState) {
//       let updatedState = {
//         title: 'STATE CHANGE',
//         display: {
//           changes
//         },
//         mutation,
//         state: JSON.stringify(newState),
//         status: 'active',
//         timestamp: new Date(Date.now()).toISOString()
//       };
//       // register event for state change
//       store.commit('addNewEvent', updatedState);
//       // update client's current state to newState
//       store.commit('updateClientState', newState);
//       // check if any of the mutations are subscribed
//       for (let change of changes) {
//         const parsedPath = pathParser(JSON.stringify(change.path));
//         // if subscribed, push to that path's array for display
//         for (let key of Object.keys(store.state.subscriptions)) {
//           if (key === parsedPath || parsedPath.search(key) !== -1) {
//             store.commit('addEventToSubscription', { key, change });
//           }
//         }
//       }
//     });

//     socket.on('eventUpdate', function (event) {
//       let newEvent = {
//         title: 'EVENT EMITTED',
//         display: event,
//         status: 'active',
//         timestamp: new Date(Date.now()).toISOString()
//       };
//       store.commit('addNewEvent', newEvent);
//     });

//     socket.on('domUpdate', function (dom) {
//       store.commit('updateClientDom', dom);
//     });

//     // listen for API responses made from FETCH requests and add to Event Stream
//     socket.on('apiRequestResponse', function (response) {
//       let updatedState = {
//         title: 'API RESPONSE',
//         display: {
//           URL: response.url,
//           Redirected: response.redirected,
//           Method: response.requestObject[0].method
//         },
//         responseObj: response,
//         requestObj: response.requestObject,
//         timestamp: new Date(Date.now()).toISOString()
//       };
//       store.commit('addFetchResponseToEvents', updatedState);
//     });
//   };
// };

// module.exports = SocketPlugin;




      // //TEST
      // console.log('MUTATION', mutation);
      // console.log('CHANGES', changes);
      // //TEST






