import Vue from 'vue';
// import Vue-Router and Vuex
import VueRouter from 'vue-router';
import { store } from './store';
// import all components
import App from './App.vue';
import Subscription from './components/Subscription.vue';
import EventStream from './components/EventStream.vue';
import ComponentTree from './components/ComponentTree.vue';
import State from './components/State.vue';
// import styles and icons
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Icon from 'vue-awesome/components/Icon.vue';
import 'vue-awesome/icons';

// use Router, Bootstrap, and Icons
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.component('icon', Icon);

// define Router routes and instantiate router
const routes = [
  { path: '/eventstream', component: EventStream },
  { path: '/subscription', component: Subscription },
  { path: '/state', component: State },
  { path: '/componentTree', component: ComponentTree }
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
