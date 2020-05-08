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
    path: "/registrations",
    name: "page-registrations",
    component: () => import("./views/templates/Test.vue")
  },
  {
    path: "/applications",
    name: "page-applications",
    component: () => import("./views/templates/Table.vue")
  },
  {
    path: "/launcher",
    name: "page-launcher",
    component: () => import("./views/templates/Launcher.vue")
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
  scrollBehavior (){
    return {
      x: 0,
      y: 0
    }
  },
  routes
})

router.afterEach((from, to) => {
  store.state.routeLoaded = true
  // document.getElementById("loading-bg").style.display = "none"
})

export default router
