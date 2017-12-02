# Installation

In order to use Vuetron, you have to download Vuetron and include the plugins in your application

## Downloading Vuetron desktop app

Here are the links:

[Download Mac](https://github.com/vuetwo/vuetron/releases/download/v1.0.0/Vuetron-1.0.0-osx.dmg)

[Download Windows](https://github.com/vuetwo/vuetron/releases/download/v1.0.0/Vuetron-1.0.0-win32-ia32.zip)

[Download Linux](https://github.com/vuetwo/vuetron/releases/download/v1.0.0/Vuetron-1.0.0-amd64.deb)

If you want to build it yourself, follow the instructions below:

```bash
# Clone this repository
$ git clone https://github.com/vuetwo/vuetron.git

# Go into the repository
$ cd vuetron/packages/vuetron-app

# Install dependencies
$ npm install

# Install vuetron-server dependencies
$ npm install ./vuetron-server

# Run the app server
$ npm run dev-server

# In a separate terminal
$ npm run dev
```

## Adding Vuetron plugins in your application

In order for Vuetron to access the application, the Vuetron library must be included

#### Try it out
If you want to test out Vuetron before you commit to installing it in your project, you can fork or clone our [example app](https://github.com/vuetwo/vuetron-example-app) with the plugins pre-configured. (Vuetron app download required separately)

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

In Vuex Store file (optional):
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
