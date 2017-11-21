import io from 'socket.io-client';
import fetchIntercept from 'fetch-intercept';
import patchEmit from './methods/patchEmit';
import patchFetch from './methods/patchFetch';
import grabAndEmitDOM from './methods/domTree';

const VuetronVue = {
  install (Vue, options = {}) {
    // set socket port to options or 9090 by default
    let { port = 9090 } = options;
    const socket = io('http://localhost:' + port);
    // Monkey patch $emit to be able to return emitted events to server
    patchEmit(socket, Vue);
    patchFetch(socket, fetchIntercept);

    Vue.mixin({
      mounted () {
        grabAndEmitDOM(socket);
      },
      destroyed () {
        grabAndEmitDOM(socket);
      }
    });
  }
};

export default VuetronVue;
