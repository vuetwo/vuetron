import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import { store } from './store';
import Subscription from './components/Subscription.vue';
import EventStream from './components/EventStream.vue';
import ComponentTree from './components/ComponentTree.vue';
import State from './components/State.vue';

// import BootstrapVue from 'bootstrap-vue';
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

// Vue.use(BootstrapVue);
Vue.use(VueRouter);

const routes = [
  { path: '/subscription', component: Subscription },
  { path: '/state', component: State },
  { path: '/eventstream', component: EventStream },
  { path: '/componentTree', component: ComponentTree }
];
const router = new VueRouter({
  routes
});

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

/* eslint-disable no-new */
new Vue({
  el: '#vuetron',
  template: '<App/>',
  store,
  router,
  components: { App }
});
/* eslint-disable-line no-new */
