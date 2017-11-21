function patchFetch(socket, fetchIntercept) {
console.log('in patch fetch');    
// initialize requestObject for use in unregister's 'request' and 'response' functions
let requestObject = {}
// monkey patch fetch API with Fetch Intercept
const unregister = fetchIntercept.register({
  request: function (url, config) {
      // Modify the url or config here
      // redefine requestObject to the config method (e.g. 'get' or 'post') for use in unregister's 'response' function
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
      // modify the response object by adding requestObject ( this was redefined in unregister's 'request' function above )
      // ..this will allow Vuetron to show standard and user-made custom request objects in addition to just the response object received back from the request
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
}

export default patchFetch;