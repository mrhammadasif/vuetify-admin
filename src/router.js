import Vue from "vue"
import VueRouter from "vue-router"
import store from "./store/index"
Vue.use(VueRouter)

const routes = [

  {
    path: "/",
    name: "page-login",
    component: () => import("./views/templates/Login.vue"),
    meta: {
      layout: "full"
    }
  },
  {
    path: "/dashboard",
    name: "page-dashboard",
    component: () => import("./views/templates/Test.vue")
  },
  {
    path: "/profile",
    name: "page-profile",
    component: () => import("./views/templates/Form.vue")
  },
  {
    path: "/topnav",
    name: "page-topnav",
    component: () => import("./views/templates/Test.vue"),
    meta: {
      layout: "topnav"
    }
  },
  {
    path: "/full",
    name: "page-full",
    component: () => import("./views/templates/Test.vue"),
    meta: {
      layout: "full"
    }
  },
  {
    path: "/404",
    name: "page-not-found",
    component: () => import("./views/templates/404.vue"),
    meta: {
      layout: "full"
    }
  },
  {
    path: "*",
    name: "catch-all",
    redirect: "/404"
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

router.afterEach((from, to) => {
  store.state.routeLoaded = true
})

export default router
