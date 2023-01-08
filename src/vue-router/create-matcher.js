/**
 * 创建路由
 */
export function createRoutes(routes, oldPatch) {
  const patchRoutes = oldPatch ? oldPatch : Object.create(null);
  routes?.forEach((route) => {
    handleRoutes(patchRoutes, route);
  });

  return {
    patchRoutes,
  };
}

function handleRoutes(patchRoutes, route, parentRoute) {
  const path = !parentRoute ? route.path : parentRoute.path + "/" + route.path;
  const target = {
    path,
    component: route.component,
    parent: parentRoute,
  };
  if (!patchRoutes[path]) {
    patchRoutes[path] = target;
  }
  route.children &&
    route.children.forEach((child) => {
      handleRoutes(patchRoutes, child, target);
    });
}

export default function createMatcher(routes) {
  const { patchRoutes } = createRoutes(routes);

  function match(router) {
    const target = patchRoutes[router];
    if (!target) {
      return undefined;
    }
    const matches = [];
    let parent = target;
    while (parent) {
      matches.unshift(parent.path);
      parent = parent.parent;
    }
    return {
      path: matches,
      matched: matches.map((route) => {
        return patchRoutes[route] ?? {};
      }),
    };
  }

  function addRoutes(routes) {
    createRoutes(routes, patchRoutes);
  }

  return {
    match,
    addRoutes,
  };
}
