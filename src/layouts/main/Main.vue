
<template>
  <div
    :class="[navbarClasses, footerClasses, {'app-page': isAppPage}]"
    class="layout--main">
    <vx-tour :steps="steps" />
    <vx-sidebar
      id="sidebar-id"
      :sidebar-items="sidebarItems"
      title="Admin Panel"
      parent=".layout--main"
    />

    <div
      id="content-area"
      :class="[contentAreaClass, {'show-overlay': bodyOverlay}]">
      <div id="content-overlay"/>

      <div
        class="content-wrapper ">
        <div
          ref="loadingNavBar"
          class="vs-con-loading__container"
        >
          <the-navbar
            :navbar-color="navbarColor"
            :show-bookmark-container="false"
            :class="[{'text-white': isNavbarDark && !isThemeDark}, {'text-base': !isNavbarDark && isThemeDark}]"
          />
        </div>

        <div class="router-view">
          <div
            :class="{'mt-0': navbarType == 'hidden'}"
            class="router-content">
            <transition :name="routerTransition">
              <div
                v-if="$route.meta.breadcrumb || $route.meta.pageTitle"
                class="router-header flex flex-wrap items-center mb-6"
              >
                <div
                  :class="{'pr-4 border-0 md:border-r border-t-0 border-b-0 border-l-0 border-solid border-grey-light' : $route.meta.breadcrumb}"
                  class="content-area__heading"
                >
                  <h2 class="mb-1">{{ routeTitle }}</h2>
                </div>

                <!-- BREADCRUMB -->
                <vx-breadcrumb
                  v-if="$route.meta.breadcrumb"
                  class="ml-4 md:block hidden"/>

                <!-- DROPDOWN -->
                <vs-dropdown
                  class="ml-auto md:block hidden cursor-pointer"
                  vs-trigger-click>
                  <vs-button
                    radius
                    icon="icon-settings"
                    icon-pack="feather"/>

                  <vs-dropdown-menu class="w-32">
                    <vs-dropdown-item>
                      <div
                        class="flex items-center"
                        @click="$router.push('/pages/profile')">
                        <feather-icon
                          icon="UserIcon"
                          class="inline-block mr-2"
                          svg-classes="w-4 h-4"
                        />
                        <span>Profile</span>
                      </div>
                    </vs-dropdown-item>

                    <vs-dropdown-item>
                      <div
                        class="flex items-center"
                        @click="$router.push('/apps/todo')">
                        <feather-icon
                          icon="CheckSquareIcon"
                          class="inline-block mr-2"
                          svg-classes="w-4 h-4"
                        />
                        <span>Tasks</span>
                      </div>
                    </vs-dropdown-item>

                    <vs-dropdown-item>
                      <div
                        class="flex items-center"
                        @click="$router.push('/apps/email')">
                        <feather-icon
                          icon="MailIcon"
                          class="inline-block mr-2"
                          svg-classes="w-4 h-4"
                        />
                        <span>Inbox</span>
                      </div>
                    </vs-dropdown-item>
                  </vs-dropdown-menu>
                </vs-dropdown>
              </div>
            </transition>
            <div class="content-area__content">
              <back-to-top
                v-if="!hideScrollToTop"
                bottom="5%"
                visibleoffset="500">
                <vs-button
                  icon="arrow_upward"
                  class="shadow-lg"/>
              </back-to-top>
              <transition
                :name="routerTransition"
                mode="out-in">
                <router-view @changeRouteTitle="changeRouteTitle"/>
              </transition>
            </div>
          </div>
        </div>
      </div>

      <the-footer/>
    </div>
  </div>
</template>

<script>
import VxSidebar from "@/layouts/components/vx-sidebar/VxSidebar.vue"
import TheNavbar from "../components/TheNavbar.vue"
import TheFooter from "../components/TheFooter.vue"
import themeConfig from "@/../themeConfig.js"
import sidebarItems from "@/layouts/components/vx-sidebar/sidebarItems.js"
import BackToTop from "vue-backtotop"
import VxTourVue from "../../components/VxTour.vue"

export default {
  components: {
    VxSidebar,
    TheNavbar,
    TheFooter,
    BackToTop,
    "vx-tour": VxTourVue
  },
  data () {
    return {
      navbarType: themeConfig.navbarType || "floating",
      navbarColor: themeConfig.navbarColor || "#fff",
      footerType: themeConfig.footerType || "static",
      routerTransition: themeConfig.routerTransition || "none",
      isNavbarDark: false,
      routeTitle: this.$route.meta.pageTitle,
      sidebarItems: sidebarItems,
      windowWidth: window.innerWidth, //width of windows
      hideScrollToTop: themeConfig.hideScrollToTop,
      disableThemeTour: themeConfig.disableThemeTour,
      steps: [
        {
          target: ".vs-sidebar--item:nth-child(1)",
          content: "Create your connection that you will be using during synchronization"
        },
        {
          target: ".vs-sidebar--item:nth-child(2)",
          content: "Create the jobs (decides when you get the data)"
        }

      ]
    }
  },
  computed: {
    isAppPage () {
      if (this.$route.path.includes("/apps/")) {
        return true
      } else {
        return false
      }
    },
    isThemeDark () {
      return this.$store.state.theme == "dark"
    },
    sidebarWidth () {
      return this.$store.state.sidebarWidth
    },
    bodyOverlay () {
      return this.$store.state.bodyOverlay
    },
    contentAreaClass () {
      if (this.sidebarWidth == "default") {
        return "content-area-default"
      } else if (this.sidebarWidth == "reduced") {
        return "content-area-reduced"
      } else if (this.sidebarWidth) {
        return "content-area-full"
      }
    },
    navbarClasses () {
      return {
        "navbar-hidden": this.navbarType == "hidden",
        "navbar-sticky": this.navbarType == "sticky",
        "navbar-static": this.navbarType == "static",
        "navbar-floating": this.navbarType == "floating"
      }
    },
    footerClasses () {
      return {
        "footer-hidden": this.footerType == "hidden",
        "footer-sticky": this.footerType == "sticky",
        "footer-static": this.footerType == "static"
      }
    }
  },
  watch: {
    $route () {
      this.routeTitle = this.$route.meta.pageTitle
    },
    isThemeDark (val) {
      if (this.navbarColor == "#fff" && val) {
        this.updateNavbarColor("#10163a")
      } else {
        this.updateNavbarColor("#fff")
      }
    }
  },
  created () {
    this.setSidebarWidth()
    if (this.navbarColor == "#fff" && this.isThemeDark) {
      this.updateNavbarColor("#10163a")
    } else {
      this.updateNavbarColor(this.navbarColor)
    }
  },
  methods: {
    changeRouteTitle (title) {
      this.routeTitle = title
    },
    updateNavbarColor (val) {
      this.navbarColor = val
      if (val == "#fff") {
        this.isNavbarDark = false
      } else {
        this.isNavbarDark = true
      }
    },
    handleWindowResize (event) {
      this.windowWidth = event.currentTarget.innerWidth
      this.setSidebarWidth()
    },
    setSidebarWidth () {
      if (this.windowWidth < 1200) {
        this.$store.commit("TOGGLE_IS_SIDEBAR_ACTIVE", false)
        this.$store.dispatch("updateSidebarWidth", "no-sidebar")
        this.disableThemeTour = true
      } else if (this.windowWidth < 1200) {
        this.$store.dispatch("updateSidebarWidth", "reduced")
      } else {
        this.$store.commit("TOGGLE_IS_SIDEBAR_ACTIVE", true)
      }
    },
    toggleHideScrollToTop (val) {
      this.hideScrollToTop = val
    }
  }
}
</script>
