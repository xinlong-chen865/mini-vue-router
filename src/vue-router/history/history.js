import Base from "./base";

function getPathName() {
  return window.location.pathname;
}

export default class BrowserHistory extends Base {
  constructor(router) {
    super(router);
  }
  /**
   * 1. 先渲染view
   * 2. 改变路由
   */
  push(to) {
    // window.dispatchEvent(new PopStateEvent("popstate"), to);
    // window.history.pushState({}, "", to);
    this.transitionTo(to, () => {
      window.history.pushState({}, "", to);
    });
  }
  getCurrentLocation() {
    return getPathName();
  }
  // 监听变化
  setupListener = () => {
    window.addEventListener("popstate", () => {
      this.transitionTo(getPathName());
    });
  };
}
