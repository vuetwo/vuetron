import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import { store } from './store';
import Subscription from './components/Subscription.vue';
import EventStream from './components/EventStream.vue';
import State from './components/State.vue';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Icon from 'vue-awesome/components/Icon.vue';
import 'vue-awesome/icons';

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.component('icon', Icon);

const routes = [
  { path: '/subscription', component: Subscription },
  { path: '/state', component: State },
  { path: '/eventstream', component: EventStream}
];

const router = new VueRouter({
  routes
});

/* eslint-disable no-new */
new Vue({
  el: '#vuetron',
  template: '<App/>',
  store,
  router,
  components: { App }
});
/* eslint-disable-line no-new */
