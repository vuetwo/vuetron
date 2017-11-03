import Vue from 'vue';
import Vuex from 'vuex';

// Import Vuetron-Vuex plugin to initialize connection to sockets
import VuetronVuex from 'vuetron-vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        clientState: {},  //state from client
        mutations: [],    //history of mutations from client
        messages: ['Store works!', 'Chicken wings are delicious'],
        tests: ['hardCodeTest', 'test2'],
        events: []
    },
    plugins: [VuetronVuex()],
    // mutations: {
        
    // }
});