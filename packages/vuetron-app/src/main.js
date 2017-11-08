import Vue from 'vue';
import App from './App.vue';
import { store } from './store';

/* eslint-disable no-new */
new Vue({
  el: '#vuetron',
  template: '<App/>',
  store,
  components: { App }
});
/* eslint-disable-line no-new */
