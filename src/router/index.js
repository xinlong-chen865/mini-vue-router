import Vue from "vue";
import VueRouter from "../vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    children: [
      {
        path: "a",
        component: {
          render() {
            return <h1>A views</h1>;
          },
        },
      },
      {
        path: "b",
        component: {
          render() {
            return <h1>B views</h1>;
          },
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.addRoutes([
  {
    path: "/about",
    children: [
      {
        path: "c",
        component: {
          render() {
            return <h1>C views</h1>;
          },
        },
      },
    ],
  },
]);

router.beforeEach((from, to, next) => {
  setTimeout(() => {
    next();
  }, 10);
});
router.beforeEach((from, to, next) => {
  setTimeout(() => {
    next();
  }, 10);
});

export default router;
