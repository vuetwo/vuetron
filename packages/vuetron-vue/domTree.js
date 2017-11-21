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

  function grabAndEmitDOM (socket) {
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



export default grabAndEmitDOM;