<h1 align="center">
<img align="center" src="./docs/images/vuetron-logo-sm.png">
<br>
</h1>

<p align="center">A tool for testing and debugging <a href="https://vuejs.org/" target="_blank">Vue.js</a> applications. <a href="http://twitter.com/home?status=Check out #Vuetron! A tool for testing and debugging #Vuejs applications. https://git.io/vFwOq"><a class="github-button" href="https://github.com/vuetwo/vuetron" data-size="large" data-show-count="true" aria-label="Star vuetwo/vuetron on GitHub">Star</a></p>

<p align="center">是一個可以幫助您 Vue.js 的項目測試及偵錯的工具, 也同時支持 Vuex及 Vue-Router.</p>

<h4 align="center"><a href="https://google.com"><img src="https://img.shields.io/github/release/talls-and-smalls/vuetron/all.svg"></a>
<a href="https://travis-ci.org/vuetwo/vuetron"><img src="https://img.shields.io/travis/vuetwo/vuetron.svg"></a>
<a href="https://www.npmjs.com/package/vuetron"><img src="https://img.shields.io/npm/v/vuetron.svg"></a>
<a href="https://codeclimate.com/github/talls-and-smalls/vuetron/maintainability"><img src="https://api.codeclimate.com/v1/badges/6170d4ec90fa5cec78ae/maintainability" /></a>
<a href="https://standardjs.com/"><img src="https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg"></a>
<a href="https://github.com/talls-and-smalls/vuetron/blob/master/LICENSE.txt"><img src="https://img.shields.io/github/license/talls-and-smalls/vuetron.svg"></a>
</h4>

## Why Vuetron? 我們為什麼用 [Vuetron](./docs/CHINESETRANSLATION.md)?

We really like the current Vue dev tools for chrome and wanted a way to extend that functionality by hooking onto the vue application itself, so we built Vuetron! Like the Developer Tools, you’re still able to view emitted events, view application state, and time travel debug. With Vuetron you have the added the ability to subscribe to specific state variables, observe API requests and responses, and visualize the component structure of your application giving you a larger toolkit for testing and debugging your Vue.js application.

## Getting Started

To use Vuetron, you will need both the desktop application and node module in your Vue project.  You can find the app download and installation instructions [here](./docs/INSTALLATION.md).

## Key Features

#### Eventstream with Time Travel Debugging:
* Instantly time travel between previous application states, or revert a whole group of state changes at once.

<div align="center">
  <img align="center" src="./docs/images/eventstream.gif" alt="time travel example" width="600" />
</div>

* See 5 types of events
  * Connected to Server: Vuetron has successfully connected to the socket server.
  * State Initialized: If using Vuex, this event is displayed when the initial state is received
    * This will reinitialize if your application is refreshed, but you will not lose previous state changes
  * State Change: If using Vuex, this event is displayed for each mutation call
    * The expanded card displays each state change that occurred
  * Event Emitted: This event is displayed for every $emit call
    * The expanded card displays the name of the $emit
  * API Request / Response: If using the fetch API for requests, this event is displayed for any request sent
    * The expanded card displays the request data as well as the response data

<div align="center">
  <img align="center" src="./docs/images/eventstream-items.png" alt="event items example" width="400" />
</div>

#### State Subscriptions:
* Subscribe to specific parts of your application's state for faster debugging

<div align="center">
  <img align="center" src="./docs/images/subscription.gif" alt="subscriptions example" width="700" />
</div>

#### Component Tree:
* Visualizing your component hierarchy has never been easier.
  * Animation allows you to collapse or expand the tree for specific hierarchy views.

<div align="center">
  <img align="center" src="./docs/images/visualization.gif" alt="component tree example" width="100%" />
</div>

#### Collapsable Vuex State Object:
* View and interact with an object representation of your application's most current state.

<div align="center">
  <img align="center" src="./docs/images/state-example.png" alt="state example" width="400" />
</div>

#### Other benefits:
* Cross platform
  - Windows, Mac, and Linux ready.
  
## Try it out

If you want to test out Vuetron before you commit to installing it in your project, you can fork or clone our [example app](https://github.com/vuetwo/vuetron-example-app) with the plugins pre-configured. (Vuetron app download required separately)

## Testing

Read the [TESTING.md](./docs/TESTING.md) file for more information on running tests.

## Built With

* [Vue.js](https://vuejs.org/) - The web framework used
* [Vuex](https://vuex.vuejs.org/en/intro.html) - State Management
* [Vue-Router](https://router.vuejs.org/en/) - Routing
* [Electron](https://electron.atom.io/) - Used to build desktop app
* [Socket.io](https://socket.io/) - Used communicate between Vuetron and client's application

## Contributing

Found a bug? Have a suggestion? Feel free to submit issues!

Please read [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests if you're interesting in contributing to this project!

## Authors

* **Samantha Salley** - [https://github.com/samanthasalley](https://github.com/samanthasalley)

* **Louis Rouaze** - [https://github.com/louisrouaze](https://github.com/louisrouaze)

* **Kelly Gilliam** - [https://github.com/KellyGilliam](https://github.com/KellyGilliam)

* **Brandon Danh** - [https://github.com/brandondanh](https://github.com/brandondanh)

See also the list of [contributors](./docs/CONTRIBUTORS.md) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details

## Acknowledgments

* [vued3tree library](https://github.com/David-Desmaisons/Vue.D3.tree)
* [vue-object-view library](https://github.com/ebuzek/vue-object-view)
* Support from other open source developers
* And the entire Vue developer community
