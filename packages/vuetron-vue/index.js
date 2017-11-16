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
        //DELETE AFTER TEST:
        console.log(this);
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

    //monkey patch fetch API
    const unregister = fetchIntercept.register({
      request: function (url, config) {
          // Modify the url or config here
          return [url, config];
      },
      requestError: function (error) {
          // Called when an error occured during another 'request' interceptor call 
          console.log('there was an error:', error);
          socket.emit('sendFetchResponse', error);
          return Promise.reject(error);
      },
      response: function (response) {
          // Modify the reponse object 
          console.log('RESPONSE:', response);
          // console.log('RESPONSE BODY', response.body);
          // console.log('RESPONSE LENGTH:', response.length);
          // socket emit that a response has been received from a fetch request
          // console.log('HELLO FROM INSIDE FETCH REQUEST MONKEYPATCH', response);
          // // let stringifiedResponse = JSON.stringify(response);
          // // console.log('STRINGED RESPONSE:', typeof stringifiedResponse)
          // setTimeout(function(){
          //   console.log('delayed resp')
          //   socket.emit('sendFetchResponse', response)
          // },3000); 
          // console.log('im emitting')

          //reconstruct object to emit. Otherwise will recieve an empty object
          var a = {}
          for(let i in response) {
              a[i] = response[i];
          }
          // socket.emit('sendFetchResponse', a)    
          socket.emit('sendFetchResponse', a);          
          
          // websocket.emit('getNavigator', a);
          // socket.emit('sendFetchResponse', response);
          return response;
      },
      responseError: function (error) {
          // Handle an fetch error 
          console.log('there was an error:', error);
          socket.emit('sendFetchResponse', error);
          return Promise.reject(error);
      }
  });

  // fetch('https://codesmith-precourse.firebaseio.com/instagram/-JqL35o8u6t3dTQaFXSV.json', {
  //   method: 'get'}).then(function (response) {
  //     console.log('hello from request')
  //     console.log(response)
  //     return response
  // // return response.json()
  //   }).catch(function (err) {
  //     console.log(err)
  //   })

  Vue.mixin({
    created () {
      // unregister();
      console.log('created');
      // console.log(fetch);
    },
    mounted () {
      grabAndEmitDOM();
      // unregister();
      console.log('mounted');
    },
    destroyed () {
      grabAndEmitDOM();
    },
    beforeUpdate () {
      // unregister();
    },
    updated () {
      // unregister();
    }
  });

  


  // .then(function(){
  //   console.log('HELLO FROM INSIDE FETCH REQUEST MONKEYPATCH', response);
  //   // let { port = 9090 } = options;
  //   // const socket = io('http://localhost:' + port);
  //   // let stringifiedResponse = JSON.stringify(response);
  //   // console.log('STRINGED RESPONSE:', typeof stringifiedResponse)
  //   socket.emit('sendFetchResponse', response); 
  // })

      

    // fetch()
    
    //access fetch API 

    // fetch('https://codesmith-precourse.firebaseio.com/instagram/-JqL35o8u6t3dTQaFXSV.json', {
    //   method: 'get'
    // }).then(function(response){
    //   for (let m = 0; m < response.length; m++) {
    //     console.log(response[m]);
    //   }
    // }).catch(function(err){
    //   console.log(err);
    // });
    // console.log('hello from index.js 2!');
    // fetch('https://codesmith-precourse.firebaseio.com/instagram/-JqL35o8u6t3dTQaFXSV.json', {
    //   method: 'get'
    // }).then(function (response) {
    //   // console.log(response.json())
    //   return response.json()
    // }).then(function (data) {
    //   console.log('HELLO INSIDE FETCH RECIEVE DATA')
    //   for (let m = 0; m < data.length; m++) {
    //     // console.log(data[m])
    //   }
    // }).catch(function (err) {
    //   console.log(err)
    // })
    }
};

// module.exports = VuetronVue;
export default VuetronVue;
