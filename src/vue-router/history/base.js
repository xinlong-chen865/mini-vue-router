import { createRoutes } from "../create-matcher";
export default class Base {
  constructor(router) {
    this.router = router;
    this.current = createRoutes(null, {
      path: "/",
    });
  }
  /**
   * 1.初始化的时候会触发
   * 2.hashchange的时候会触发
   */
  transitionTo(location, listener) {
    const route = this.router.match(location);

    /**
     * current无法暴露到外面
     */
    this.current = route;
    /**
     * 触发this._route的响应式
     */
    this.cb && this.cb(route);

    listener && listener();
  }
  listen(cb) {
    this.cb = cb;
  }
}
