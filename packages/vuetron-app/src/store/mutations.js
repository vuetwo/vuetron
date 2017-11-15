const io = require('socket.io-client');

const pathParser = (str) => {
  return str.split(/[^A-Za-z0-9]/).filter(elem => elem !== null && elem !== '').join('.');
};

const mutations = {
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
};

export default mutations;
