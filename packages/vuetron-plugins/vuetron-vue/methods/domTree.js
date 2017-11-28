import get from 'lodash.get';

// define closure function to generate and store unique IDs
const idGenerator = () => {
  let cache = {};
  return function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    let id = s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
    if (!cache[id]) return id;
    guid();
  };
};

const gid = idGenerator(); // Instantiate ID generator

// takes in a DOM object and traverse through the components to output an object representing the component hierachy
const buildObject = (component) => {
  const name = get(component, 'component.$vnode.tag', null);
  const id = gid();
  if (!name) return undefined;
  let obj = { name, id };
  if (component.hasOwnProperty('$children') && component.$children.length > 0) {
    obj.children = [];
    for (let childComponent of component.$children) {
      obj.children.push(buildObject(childComponent));
    }
  }
  return obj;
};

/**
 * recursively builds child component object
 * @param {*} obj - object is the current DOM component
 * @param {*} name - string representing the name of component
 * @param {*} id - string of a randomly generated unique id
 */
const buildRouteObject = (obj, name, id) => {
  let res = {name, id};
  res.children = [];
  if (obj.components) {
    let childNames = Object.keys(obj.components);
    for (let i = 0; i < childNames.length; i++) {
      res.children.push(buildRouteObject(obj.components[childNames[i]], childNames[i], gid()));
    }
  }
  return res;
};

/**
 * initializes top level component object
 * @param {*} name - string representing the name of component
 * @param {*} id - string of a randomly generated unique id
 * @param {*} arr - array of any child components
 */
const buildRouterObject = (name, id, arr) => {
  const obj = {name, id};
  obj.children = [];
  for (let i = 0; i < arr.length; i++) {
    obj.children.push(buildRouteObject(arr[i].component, arr[i].name, gid()));
  }
  return obj;
};

/**
 * 
 * @param {*} socket - the socket instance passed by client vue plugin instance
 */
const grabAndEmitDOM = (socket) => {
  let parents = document.body.children;
  const children = [];
  for (let node of parents) {
    let tag = get(node, '__vue__.$children[0].$vnode.tag', null);
    let routes = get(node, '__vue__._router.options.routes', []);
    if (routes.length > 0) { // if client is using vue router
      socket.emit('clientDomTree', buildRouterObject(tag, gid(), routes));
    } else { // if not using vue router
      let firstComp = get(node, '__vue__.$children', []);
      if (firstComp.length > 0) {
        children.push('mounted', firstComp[0]);
        socket.emit('clientDomTree', buildObject(firstComp[0]));
      }
    }
  }
};

export default grabAndEmitDOM;
