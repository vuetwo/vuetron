import Vue from 'vue';
import App from './App.vue';
import { store } from './store';
import VueRouter from 'vue-router';





new Vue({
  el: '#vuetron',
  template: '<App/>',
  store,
  components: { App }
});

