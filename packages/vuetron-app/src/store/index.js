import Vue from 'vue';
import Vuex from 'vuex';

import state from './state';
import mutations from './mutations';
import SocketPlugin from '../sockets/SocketPlugin';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state,
  mutations,
  plugins: [SocketPlugin()]
});
