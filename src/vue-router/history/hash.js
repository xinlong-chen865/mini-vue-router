import Base from "./base";

function ensuoreSlash() {
  if (!window.location.hash) {
    window.location.hash = "/";
  }
}

function getHash() {
  return window.location.hash.slice(1);
}

export default class HashHistory extends Base {
  constructor(router) {
    super(router);
    ensuoreSlash();
  }
  push(to) {
    window.location.hash = to;
  }
  getCurrentLocation() {
    return getHash();
  }
  // 监听变化
  setupListener = () => {
    window.addEventListener("hashchange", () => {
      this.transitionTo(getHash());
    });
  };
}
