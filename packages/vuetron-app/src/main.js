import Vue from 'vue';
import App from './App.vue';
import { store } from './store';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

/* eslint-disable no-new */
new Vue({
  el: '#vuetron',
  template: '<App/>',
  store,
  components: { App }
});
/* eslint-disable-line no-new */
