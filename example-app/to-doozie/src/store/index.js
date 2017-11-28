import Vue from 'vue';
import Vuex from 'vuex';
import Vuetron from 'vuetron';

import state from './state';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  plugins: [Vuetron.VuetronVuex()]
});
