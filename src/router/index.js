import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import store from "@/store";
import Product from "../views/Product.vue";
import ProductCreate from "../views/ProductCreate.vue";
import ProductEdit from "../views/ProductEdit.vue";
import Vocabulary from "../views/Vocabulary.vue";

function alreadyLogin(to, from, next) {
  if (store.state.auth) {
    return next("/dashboard");
  }
  return next();
}

function needAuth(to, from, next) {
  if (store.state.auth) {
    return next();
  }
  return next("/login");
}

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    beforeEnter: alreadyLogin,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    beforeEnter: alreadyLogin,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    beforeEnter: needAuth,
  },
  {
    path: "/product",
    name: "product",
    component: Product,
    beforeEnter: needAuth,
  },
  {
    path: "/product/create",
    name: "product.create",
    component: ProductCreate,
    beforeEnter: needAuth,
  },
  {
    path: "/product/edit/:id",
    name: "product.edit",
    component: ProductEdit,
    beforeEnter: needAuth,
  },
  {
    path: "/vocabulary",
    name: "vocabulary",
    component: Vocabulary,
    beforeEnter: needAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
