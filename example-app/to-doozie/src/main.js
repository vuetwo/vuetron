// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// import Vuex store and Router
import { store } from './store';
import router from './router';
// import Vuetron plugin
import Vuetron from 'vuetron';
// import styles and icons
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Icon from 'vue-awesome/components/Icon.vue';
import 'vue-awesome/icons';
// import app
import App from './App';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(Vuetron.VuetronVue);
Vue.component('icon', Icon);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});
