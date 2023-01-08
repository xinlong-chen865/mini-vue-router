import RouterView from "./compoents/router-view";
import RouterLink from "./compoents/router-link";

const install = (_Vue) => {
  const Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);

        /**
         * 为了保障 _route是响应式的
         */
        Vue.util.defineReactive(this, "_route", this._router.history.current);
      } else if (this.$parent && this.$parent._routerRoot) {
        this._routerRoot = this.$parent._routerRoot;
      }
    },
  });

  Object.defineProperty(Vue.prototype, "$router", {
    get() {
      return this._routerRoot._router;
    },
  });
  Object.defineProperty(Vue.prototype, "$route", {
    get() {
      return this._routerRoot._route;
    },
  });

  Vue.component("RouterLink", RouterLink);
  Vue.component("RouterView", RouterView);
};

export default install;
