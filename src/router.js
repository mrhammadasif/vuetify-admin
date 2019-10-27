
import Vue from "vue"
import Router from "vue-router"

import store from "@/store/store"

Vue.use(Router)

export const routes = [
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
        component: () => import("./views/Home.vue")
      },
      {
        path: "/services",
        name: "app-services",
        component: () => import("./views/Services.vue")

      },
      {
        path: "/services/add",
        name: "app-add-services",
        component: () => import("./views/ServicesForm.vue?_t=1")

      },
      {
        path: "/services/detail/:serviceId",
        name: "app-service-detail",
        component: () => import("./views/ServicesForm.vue?_t=2"),
        meta: {isDetailView: true}
      },
      {
        path: "/users",
        name: "app-users",
        component: () => import("./views/Users.vue")
      },
      {
        path: "/users/add",
        name: "add-user",
        component: () => import("./views/UsersForm.vue")
      },
      {
        path: "/proposals",
        name: "app-proposals",
        component: () => import("./views/Proposals.vue")

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

const router = new Router({
  mode: "history",
  scrollBehavior () {
    return {
      x: 0,
      y: 0
    }
  },
  routes
})

router.beforeEach((to, from, next) => {
  // you are not allowed to visit admin
  if (to.path.includes("login") && store.state.token) {
    next("/")
    return
  }
  if (to.matched.find((route) => route.meta.isPublic)) {
    next()
  }
  else if (!store.state.token) {
    next("/login")
  }
  else {
    next()
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
