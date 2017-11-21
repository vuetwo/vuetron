import _ from 'lodash.get';

const buildObject = (component) => {
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
};

const buildRouteObject = (obj, name) => {
  let res = {name};
  res.children = [];
  if (obj.components) {
    let childNames = Object.keys(obj.components);
    for (let i = 0; i < childNames.length; i++) {
      res.children.push(buildRouteObject(obj.components[childNames[i]], childNames[i]));
    }
  }
  return res;
};

const buildRouterObject = (name, arr) => {
  const obj = {name};
  obj.children = [];
  for (let i = 0; i < arr.length; i++) {
    obj.children.push(buildRouteObject(arr[i].component, arr[i].name));
  }
  return obj;
};

const grabAndEmitDOM = (socket) => {
  let parents = document.body.children;
  const children = [];
  for (let node of parents) {
    let tag = _.get(node, '__vue__.$children[0].$vnode.tag', null);
    let routes = _.get(node, '__vue__._router.options.routes', null);
    if (routes.length > 0) {
      socket.emit('clientDomTree', buildRouterObject(tag, routes));
    } else {
      let firstComp = _.get(node, '__vue__.$children', []);
      if (firstComp.length > 0) {
        children.push('mounted', firstComp[0]);
        socket.emit('clientDomTree', buildObject(firstComp[0]));
      }
    }
  }
};

export default grabAndEmitDOM;
