import Vue from 'vue';
import Vuex from 'vuex';
import SocketPlugin from './sockets/SocketPlugin';

const io = require('socket.io-client');

Vue.use(Vuex);

const pathParser = (str) => {
  return str.split(/[^A-Za-z0-9]/).filter(elem => elem !== null && elem !== '').join('.');
};

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
    // UI mutations
    toggleNavbarDisplay (state) {
      state.displayNavbar = !state.displayNavbar;
    },
    toggleEventShow (state, evIdx) {
      state.events[evIdx].show = !state.events[evIdx].show;
    },
    // Client State mutations
    updateClientState (state, newClientState) {
      state.clientState = newClientState;
    },
    revertClientState (state, revertedState) {
      state.clientState = JSON.parse(revertedState);
      let port = 9090;
      const socket = io('http://localhost:' + port);
      socket.emit('vuetronStateUpdate', revertedState);
    },
    // Event mutations
    addNewEvent (state, newEvent) {
      if (!newEvent.title || !newEvent.display) throw new Error('invalid event data');
      if (!newEvent.show) newEvent.show = false;
      state.events.unshift(newEvent);
    },
    // Subscription mutations
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
    // Component Tree mutations
    updateClientDom (state, newDom) {
      state.domTree = newDom;
    }
  },
  plugins: [SocketPlugin()]
});
