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

    function buildRouteObject (obj, name) {
      let res = {name};
      res.children = [];
      if (obj.components) {
        let childNames = Object.keys(obj.components);
        for (let i = 0; i < childNames.length; i++) {
          res.children.push(buildRouteObject(obj.components[childNames[i]], childNames[i]));
        }
      }
      return res;
    }

    function buildRouterObject (name, arr) {
      const obj = {name};
      obj.children = [];
      for (let i = 0; i < arr.length; i++) {
        obj.children.push(buildRouteObject(arr[i].component, arr[i].name));
      }
      return obj;
    }

    function grabAndEmitDOM () {
      let parents = document.body.children;
      const children = [];
      for (let node of parents) {
        if (node.hasOwnProperty('__vue__') && node.__vue__.hasOwnProperty('_router') && node.__vue__._router.hasOwnProperty('options') && node.__vue__._router.options.hasOwnProperty('routes') && node.__vue__._router.options.routes.length > 0) {
          socket.emit('clientDomTree', buildRouterObject(node.__vue__.$children[0].$vnode.tag, node.__vue__._router.options.routes));
        } else if (node.hasOwnProperty('__vue__') && node.__vue__.hasOwnProperty('$children') && node.__vue__.$children.length > 0) {
          children.push('mounted', node.__vue__.$children[0]);
          const firstComp = node.__vue__.$children[0];
          socket.emit('clientDomTree', buildObject(firstComp));
        }
      }
    }

    // initialize requestObject for use in unregister's 'request' and 'response' functions
    let requestObject = {}
    // monkey patch fetch API with Fetch Intercept
    const unregister = fetchIntercept.register({
      request: function (url, config) {
          // Modify the url or config here
          // redefine requestObject to the config method (e.g. 'get' or 'post') for use in unregister's 'response' function
          // console.log('CONFIG', config);
          requestObject = config;
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
          // reconstruct object for emit. Otherwise we will recieve an empty object
          var reconstructedResponse = {}
          for(let property in response) {
              reconstructedResponse[property] = response[property];
          }
          console.log('THERE HAS BEEN A RESPONSE!!', reconstructedResponse)
          // modify the response object by adding requestObject ( this was redefined in unregister's 'request' function above )..
          // ..this will allow Vuetron to show standard and user-made custom request objects in addition to just the response object received back from the request..
          // ..this will be deleted from the modified response object in SocketPlugin.js (in 'apiRequestResponse) before it is displayed under event stream's 'API RESPONSE' Response Object' toggle button.. 
          // ..in order to show the original response object
          reconstructedResponse['requestObject'] = [requestObject];
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
    },
    destroyed () {
      grabAndEmitDOM();
    }
  }); 
 }
};

// module.exports = VuetronVue;
export default VuetronVue;
