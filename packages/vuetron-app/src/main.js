import Vue from 'vue';
import App from './App.vue';
import { store } from './store';
import VueRouter from 'vue-router';
import Subscription from './components/Subscription.vue';
import State from './components/State.vue';
import EventStream from './components/Eventstream.vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(VueRouter);
Vue.use(BootstrapVue);

const routes = [
  { path: '/subscription', component: Subscription },
  { path: '/state', component: State },
  { path: '/eventstream', component: EventStream }
];

const router = new VueRouter({
  routes
});

/* eslint-disable no-new */
new Vue({
  el: '#vuetron',
  template: '<App/>',
  router,
  store,
  components: { App }
});
/* eslint-disable-line no-new */
