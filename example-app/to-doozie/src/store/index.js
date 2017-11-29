import Vue from 'vue';
import Vuex from 'vuex';
// import Vuetron from 'vuetron';
import Vuetron from 'vuetron';
// import store items
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations,
  plugins: [Vuetron.VuetronVuex()]
});
