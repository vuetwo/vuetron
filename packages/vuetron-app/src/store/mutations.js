const io = require('socket.io-client');

const pathParser = (str) => {
  return str.split(/[^A-Za-z0-9]/).filter(elem => elem !== null && elem !== '').join('.');
};

const mutations = {
  // UI mutations
  toggleNavbarDisplay (state) {
    state.displayNavbar = !state.displayNavbar;
  },
  toggleEventCollapseForReqObj (state, evIdx) {
    state.events[evIdx].reqObjCollapse = !state.events[evIdx].reqObjCollapse;
  },
  toggleEventCollapseForResObj (state, evIdx) {
    state.events[evIdx].resObjCollapse = !state.events[evIdx].resObjCollapse;
  },
  // Client State mutations
  updateClientState (state, newClientState) {
    state.clientState = newClientState;
  },
  revertClientState (state, evIdx) {
    const events = state.events.slice(0);
    const payload = {};
    payload.mutationLog = [];
    for (let i = 0; i < events.length; i++) {
      if (i < evIdx && events[i].title === 'STATE CHANGE') {
        events[i].status = 'inactive';
      } else if (i >= evIdx && events[i].title === 'STATE CHANGE' && !payload.initState) {
        payload.mutationLog.unshift(events[i].mutation);
      } else if (i >= evIdx && events[i].title === 'STATE INITIALIZED' && !payload.initState) {
        payload.initState = events[i].display;
      }
    }
    state.events = events;
    let port = 9090;
    const socket = io('http://localhost:' + port);
    socket.emit('vuetronStateUpdate', payload);
  },
  mutateClientState (state, evIdx) {
    state.events[evIdx].status = 'active';
    let port = 9090;
    const socket = io('http://localhost:' + port);
    socket.emit('vuetronMutateState', state.events[evIdx].mutation);
  },
  deactivateStateEvent (state, evIdx) {
    const payload = {};
    payload.mutationLog = [];
    for (let i = 0; i < state.events.length; i++) {
      if (i !== evIdx && state.events[i].title === 'STATE CHANGE' && !payload.initState) {
        payload.mutationLog.unshift(state.events[i].mutation);
      } else if (i > evIdx && state.events[i].title === 'STATE INITIALIZED' && !payload.initState) {
        payload.initState = state.events[i].display;
      }
    }
    state.events[evIdx].status = 'inactive';
    let port = 9090;
    const socket = io('http://localhost:' + port);
    socket.emit('vuetronStateUpdate', payload);
  },
  // Event mutations
  addNewEvent (state, newEvent) {
    if (!newEvent.title || !newEvent.display) throw new Error('invalid event data');
    if (!newEvent.show) newEvent.show = false;
    state.events.unshift(newEvent);
  },
  addFetchResponseToEvents (state, response) {
    if (!response.title || !response.display) throw new Error('invalid event data');
    if (!response.show) response.show = false;
    // enable toggling to show / hide request object
    if (!response.reqObjCollapse) response.reqObjCollapse = false;
    // enable toggling to show / hide request object
    if (!response.resObjCollapse) response.resObjCollapse = false;
    state.events.unshift(response);
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
