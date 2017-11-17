const io = require('socket.io-client');
import fetchIntercept from 'fetch-intercept';
// import 'whatwg-fetch'  //not in entry point. Will give error/not work?

console.log('hello from index.js 1!');

const VuetronVue = {
  install (Vue, options = {}) {
    // set socket port to options or 9090 by default
    let { port = 9090 } = options;
    const socket = io('http://localhost:' + port);
    // Monkey patch $emit to be able to return emitted events to server
    Vue.prototype.$emit = (function (original) {
      return function (...cb) {
        let currThis = this;
        // check if event (cb[0]) is a user emitted event
        if (typeof cb[0] === 'string' && !cb[0].includes('hook:')) {
          // socket emit that a user event has been emitted
          socket.emit('clientEmitEvent', cb[0]);
          // find the context that has the correct event
          let temp = Object.getPrototypeOf({});
          Object.setPrototypeOf(currThis._events, temp);
          while (!currThis._events.hasOwnProperty(cb[0]) && this._context !== undefined) {
            currThis = currThis._context;
          }
        }
        original.apply(currThis, cb);
      };
    }(Vue.prototype.$emit));

    function buildObject (component) {
      if (!component || !component.$vnode || !component.$vnode.hasOwnProperty('tag')) return;
      let obj = {};
      obj.name = component.$vnode.tag;
      if (component.hasOwnProperty('$children') && component.$children.length > 0) {
        obj.children = [];
        for (let childComponent of component.$children) {
          obj.children.push(buildObject(childComponent));
        }
      }
      return obj;
    }

    function grabAndEmitDOM () {
      let parents = document.body.children;
      const children = [];
      for (let node of parents) {
        if (node.hasOwnProperty('__vue__') && node.__vue__.hasOwnProperty('$children') && node.__vue__.$children.length > 0) {
          children.push('mounted', node.__vue__.$children[0]);
          const firstComp = node.__vue__.$children[0];
          socket.emit('clientDomTree', buildObject(firstComp));
        }
      }
    }

    let reqType = 'type'
    //monkey patch fetch API
    const unregister = fetchIntercept.register({
      request: function (url, config) {
          // Modify the url or config here
          //redefine reqType to the config method (i.e. 'get' or 'post') to add to response object sent over sockets
          reqType = config;
          return [url, config];
      },
      requestError: function (error) {
          // Called when an error occured during another 'request' interceptor call 
          console.log('there was an error:', error);
          // socket.emit('sendFetchResponse', error);
          return Promise.reject(error);
      },
      response: function (response) {
          // Modify the reponse object 
          //reconstruct object to emit. Otherwise we will recieve an empty object
          var reconstructedResponse = {}
          for(let property in response) {
              reconstructedResponse[property] = response[property];
          }
          //modify the response object by adding the request type
          reconstructedResponse['TYPE'] = [reqType];
          socket.emit('sendFetchResponse', reconstructedResponse);          
          return response;
      },
      responseError: function (error) {
          // Handle a fetch error 
          console.log('there was an error:', error);
          return Promise.reject(error);
      }
  });

  Vue.mixin({
    mounted () {
      grabAndEmitDOM();
      console.log('mounted');
    },
    destroyed () {
      grabAndEmitDOM();
    }
  }); 
 }
};

// module.exports = VuetronVue;
export default VuetronVue;
