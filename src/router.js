
import Vue from "vue"
import Router from "vue-router"

import store from "@/store/store"

Vue.use(Router)

const router = new Router({
  mode: "history",
  scrollBehavior () {
    return {
      x: 0,
      y: 0
    }
  },
  routes: [
    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: "",
      component: () => import("./layouts/main/Main.vue"),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: "/",
          name: "app-home",
          redirect: "/page"
          // component: () => import("./views/Home.vue"),

        },
        {
          path: "/page",
          name: "app-page",
          component: () => import("./views/Connections.vue")

        },
        {
          path: "/page2",
          name: "app-page2",
          component: () => import("./views/Connections.vue")

        }

      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: "",
      component: () => import("@/layouts/full-page/FullPage.vue"),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: "/not-found",
          name: "app-404",
          component: () => import("@/views/pages/Error404.vue"),
          meta: {isPublic: true}
        },
        {
          path: "/login",
          name: "app-login",
          component: () => import("./views/pages/Login.vue"),
          meta: {isPublic: true}
        },

        {
          path: "/not-authorized",
          name: "page-not-authorized",
          component: () => import("@/views/pages/NotAuthorized.vue"),
          meta: {isPublic: true}
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: "*",
      redirect: "/not-found"
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(sessionStorage.getItem("token"))
  console.log("going to")
  if (to.matched.find((route) => route.meta.isPublic)) {
    next()
  }
  else {
    // you are not allowed to visit admin
    store.dispatch("loadTokenFromSession").then((isLoggedIn) => {
      if (isLoggedIn) {
        // this.$router.replace("/")
        next()
      }
      else {
        next("/login")
      }
    })
  }
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg")
  if (appLoading) {
    appLoading.style.display = "none"
  }
})

export default router
