// Monkey patch $emit to be able to return emitted events to server
function patchEmit(socket, vueEmit) {
	vueEmit = (function (original) {
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
	}(vueEmit));
}

export default patchEmit;