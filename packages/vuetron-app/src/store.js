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
      },
      timestamp: new Date(Date.now()).toISOString()
    };
    store.commit('addNewEvent', initEvent);

    // request current client state on socket connection
    // if (Object.keys(store.state.clientState).length < 1) {
    //   socket.emit('requestClientState');
    // }

    socket.on('setInitState', function (state) {
      let event = {
        title: 'STATE INITIALIZED',
        display: state,
        timestamp: new Date(Date.now()).toISOString()
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
        },
        state: JSON.stringify(newState),
        timestamp: new Date(Date.now()).toISOString()
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
            store.commit('addEventToSubscription', { key, change });
          }
        }
      }
    });

    socket.on('eventUpdate', function (event) {
      let newEvent = {
        title: 'EVENT EMITTED',
        display: event,
        timestamp: new Date(Date.now()).toISOString()
      };
      store.commit('addNewEvent', newEvent);
    });

    socket.on('domUpdate', function (dom) {
      store.commit('updateClientDom', dom);
    });

    //listen for API responses made from FETCH and add to Event Stream
    socket.on('apiRequestResponse', function (response) {
      let updatedState = {
        title: 'API RESPONSE',
        display: {
          URL: response.url,
          Redirected: response.redirected,
          Method: response.TYPE[0].method
        },
        state: null,
        timestamp: new Date(Date.now()).toISOString()
      };
      store.commit('addFetchResponseToEvents', updatedState);
    })
  };
};

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    clientState: {},  // state from client
    events: [],
    subscriptions: {},
    // test domTree
    domTree: {
      "children": [
        {
          "children": [
            {
              "children": [
                {
                  "children": [
                    {
                      "children": [

                      ],
                      "id": 53,
                      "name": "DiscogsEntityType"
                    },
                    {
                      "children": [

                      ],
                      "id": 50,
                      "name": "DiscogsImageFormatType"
                    },
                    {
                      "children": [

                      ],
                      "id": 52,
                      "name": "DiscogsPaginable"
                    },
                    {
                      "children": [

                      ],
                      "id": 54,
                      "name": "DiscogsSearch"
                    },
                    {
                      "children": [

                      ],
                      "id": 51,
                      "name": "DiscogsSortInformation"
                    }
                  ],
                  "id": 49,
                  "name": "Query"
                },
                {
                  "children": [
                    {
                      "children": [

                      ],
                      "id": 14,
                      "name": "DiscogsArtist"
                    },
                    {
                      "children": [

                      ],
                      "id": 13,
                      "name": "DiscogsArtistRelease"
                    },
                    {
                      "children": [

                      ],
                      "id": 46,
                      "name": "DiscogsArtistReleases"
                    },
                    {
                      "children": [

                      ],
                      "id": 23,
                      "name": "DiscogsArtistSortType"
                    },
                    {
                      "children": [

                      ],
                      "id": 27,
                      "name": "DiscogsCommunity"
                    },
                    {
                      "children": [

                      ],
                      "id": 26,
                      "name": "DiscogsCommunityInfo"
                    },
                    {
                      "children": [

                      ],
                      "id": 15,
                      "name": "DiscogsCommunityReleaseRating"
                    },
                    {
                      "children": [

                      ],
                      "id": 28,
                      "name": "DiscogsEntity"
                    },
                    {
                      "children": [

                      ],
                      "id": 29,
                      "name": "DiscogsFormat"
                    },
                    {
                      "children": [

                      ],
                      "id": 22,
                      "name": "DiscogsGroupOrBandMember"
                    },
                    {
                      "children": [

                      ],
                      "id": 30,
                      "name": "DiscogsIdentifier"
                    },
                    {
                      "children": [

                      ],
                      "id": 16,
                      "name": "DiscogsIdentity"
                    },
                    {
                      "children": [

                      ],
                      "id": 40,
                      "name": "DiscogsImage"
                    },
                    {
                      "children": [

                      ],
                      "id": 31,
                      "name": "DiscogsImageType"
                    },
                    {
                      "children": [

                      ],
                      "id": 32,
                      "name": "DiscogsLabel"
                    },
                    {
                      "children": [

                      ],
                      "id": 17,
                      "name": "DiscogsLabelRelease"
                    },
                    {
                      "children": [

                      ],
                      "id": 48,
                      "name": "DiscogsLabelReleases"
                    },
                    {
                      "children": [

                      ],
                      "id": 24,
                      "name": "DiscogsMaster"
                    },
                    {
                      "children": [

                      ],
                      "id": 19,
                      "name": "DiscogsPaginableResults`1"
                    },
                    {
                      "children": [

                      ],
                      "id": 33,
                      "name": "DiscogsPaginedResult"
                    },
                    {
                      "children": [

                      ],
                      "id": 34,
                      "name": "DiscogsPaginedUrls"
                    },
                    {
                      "children": [

                      ],
                      "id": 25,
                      "name": "DiscogsRating"
                    },
                    {
                      "children": [

                      ],
                      "id": 41,
                      "name": "DiscogsRelease"
                    },
                    {
                      "children": [

                      ],
                      "id": 39,
                      "name": "DiscogsReleaseArtist"
                    },
                    {
                      "children": [

                      ],
                      "id": 35,
                      "name": "DiscogsReleaseBase"
                    },
                    {
                      "children": [

                      ],
                      "id": 18,
                      "name": "DiscogsReleaseLabel"
                    },
                    {
                      "children": [

                      ],
                      "id": 20,
                      "name": "DiscogsReleaseRating"
                    },
                    {
                      "children": [

                      ],
                      "id": 44,
                      "name": "DiscogsReleaseVersion"
                    },
                    {
                      "children": [

                      ],
                      "id": 47,
                      "name": "DiscogsReleaseVersions"
                    },
                    {
                      "children": [

                      ],
                      "id": 36,
                      "name": "DiscogsSearchResult"
                    },
                    {
                      "children": [

                      ],
                      "id": 42,
                      "name": "DiscogsSearchResults"
                    },
                    {
                      "children": [

                      ],
                      "id": 37,
                      "name": "DiscogsSimplifiedLabel"
                    },
                    {
                      "children": [

                      ],
                      "id": 21,
                      "name": "DiscogsSortOrderType"
                    },
                    {
                      "children": [

                      ],
                      "id": 38,
                      "name": "DiscogsTrack"
                    },
                    {
                      "children": [

                      ],
                      "id": 43,
                      "name": "DiscogsUser"
                    },
                    {
                      "children": [

                      ],
                      "id": 45,
                      "name": "DiscogsVideo"
                    }
                  ],
                  "id": 12,
                  "name": "Result"
                }
              ],
              "id": 11,
              "name": "Data"
            },
            {
              "children": [
                {
                  "children": [

                  ],
                  "id": 9,
                  "name": "DiscogsWebClient"
                },
                {
                  "children": [

                  ],
                  "id": 10,
                  "name": "IDiscogsWebClient"
                }
              ],
              "id": 8,
              "name": "Internal"
            },
            {
              "children": [

              ],
              "id": 2,
              "name": "DiscogsAuthentifierClient"
            },
            {
              "children": [

              ],
              "id": 3,
              "name": "DiscogsClient"
            },
            {
              "children": [

              ],
              "id": 4,
              "name": "DiscogsException"
            },
            {
              "children": [

              ],
              "id": 5,
              "name": "IDiscogsDataBaseClient"
            },
            {
              "children": [

              ],
              "id": 6,
              "name": "IDiscogsReleaseRatingClient"
            },
            {
              "children": [

              ],
              "id": 7,
              "name": "IDiscogsUserIdentityClient"
            }
          ],
          "id": 1,
          "name": "DiscogsClient"
        }
      ],
      "id": 0,
      "name": "DiscogsClient"
    },
    displayNavbar: true
  },

  mutations: {
    toggleNavbarDisplay (state) {
      state.displayNavbar = !state.displayNavbar;
    },
    toggleEventShow (state, evIdx) {
      state.events[evIdx].show = !state.events[evIdx].show;
    },
    updateClientState (state, newClientState) {
      state.clientState = newClientState;
    },
    revertClientState (state, revertedState) {
      state.clientState = JSON.parse(revertedState);
      let port = 9090;
      const socket = io('http://localhost:' + port);
      socket.emit('vuetronStateUpdate', revertedState);
    },
    addNewEvent (state, newEvent) {
      if (!newEvent.title || !newEvent.display) throw new Error('invalid event data');
      if (!newEvent.show) newEvent.show = false;
      state.events.unshift(newEvent);
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
    },
    updateClientDom (state, newDom) {
      state.domTree = newDom;
    },
    addFetchResponseToEvents (state, response) {           
      if (!response.show) response.show = false;
      state.events.unshift(response);
    }
  },
  plugins: [VuetronVuex()]
});
