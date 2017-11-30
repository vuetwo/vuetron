# Installation

In order to use Vuetron, you have to download Vuetron and include the plugins in your application

## Downloading Vuetron desktop app

Here are the links:

Download Mac

Download Windows

Download Linux

If you want to build it yourself, follow the instructions below:

```bash
# Clone this repository
$ git clone https://github.com/vuetwo/vuetron.git

# Go into the repository
$ cd vuetron/packages/vuetron-app

# Install dependencies
$ npm install

# Run the app server
$ npm run dev-server

# In a separate terminal
$ npm run dev
```

## Adding Vuetron plugins in your application

In order for Vuetron to access the application, the Vuetron library must be included

Installing the Vuetron npm module
```bash
$ npm install vuetron --save-dev
```

In main Vue file:
```js
// Using ES6
import Vue from 'vue'
import App from './App.vue'
import { VuetronVue } from 'vuetron';

Vue.use(VuetronVue);

new Vue({
  // ...
});

// Using ES5
import Vue from 'vue'
import App from './App.vue'
import vuetron from 'vuetron';

Vue.use(vuetron.VuetronVue);

new Vue({
  // ...
});
```

In Vuex Store file:
```js
// Using ES6
import Vue from 'vue';
import Vuex from 'vuex';
import { VuetronVuex } from 'vuetron';

const store = new Vuex.Store({
  // ...
  plugins: [VuetronVuex()]
})

// Using ES5
import Vue from 'vue';
import Vuex from 'vuex';
import vuetron from 'vuetron';

const store = new Vuex.Store({
  // ...
  plugins: [vuetron.VuetronVuex()]
})
```
## That's it!

Go ahead and launch Vuetron and your application and test away!