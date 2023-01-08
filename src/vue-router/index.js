import createMatcher from "./create-matcher";
import HashHistory from "./history/hash";
import BrowserHistory from "./history/history";
import install from "./install";

function runQueue(queue, from, to, callback) {
  function next(index) {
    if (index === queue.length) {
      return callback();
    }
    const handler = queue[index++];
    handler(from, to, () => next(index));
  }

  next(0);
}

class VueRouter {
  constructor(options = {}) {
    this.matcher = createMatcher(options.routes ?? []);

    this.beforeEachHooks = [];

    switch (options.mode) {
      case "hash":
        this.history = new HashHistory(this);
        break;

      case "history":
        this.history = new BrowserHistory(this);
        break;
    }
  }

  init(app) {
    const history = this.history;
    history.transitionTo(history.getCurrentLocation(), history.setupListener);
    history.listen((route) => {
      app._route = route;
    });
  }
  addRoutes(routes) {
    this.matcher.addRoutes(routes);
  }
  match(location) {
    return this.matcher.match(location);
  }
  push(to) {
    runQueue(
      this.beforeEachHooks,
      this.history.getCurrentLocation(),
      to,
      () => {
        this.history.push(to);
      }
    );
  }
  beforeEach(hooks) {
    this.beforeEachHooks.push(hooks);
  }
}

VueRouter.install = install;

export default VueRouter;
