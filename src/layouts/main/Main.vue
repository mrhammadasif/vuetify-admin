<!-- =========================================================================================
    File Name: Main.vue
    Description: Main layout
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div
    :class="[layoutTypeClass, navbarClasses, footerClasses, {'no-scroll': isAppPage}]"
    class="layout--main">
    <v-nav-menu
      :nav-menu-items="navMenuItems"
      title="Vuexy"
      parent=".layout--main" />

    <div
      id="content-area"
      :class="[contentAreaClass, {'show-overlay': bodyOverlay}]">
      <div id="content-overlay" />

      <template v-if="mainLayoutType === 'horizontal' && windowWidth >= 1200">
        <the-navbar-horizontal
          :navbar-type="navbarType"
          :class="[
            {'text-white' : isNavbarDark && !isThemeDark},
            {'text-base' : !isNavbarDark && isThemeDark}
          ]" />

        <div
          v-if="navbarType === 'static'"
          style="height: 62px"></div>

        <h-nav-menu
          :class="[
            {'text-white' : isNavbarDark && !isThemeDark},
            {'text-base' : !isNavbarDark && isThemeDark}
          ]"
          :nav-menu-items="navMenuItems" />
      </template>

      <template v-else>
        <the-navbar-vertical
          :navbar-color="navbarColor"
          :class="[
            {'text-white' : isNavbarDark && !isThemeDark},
            {'text-base' : !isNavbarDark && isThemeDark}
          ]" />
      </template>

      <div class="content-wrapper">
        <div class="router-view">
          <div class="router-content">
            <transition :name="routerTransition">
              <div
                v-if="$route.meta.breadcrumb || $route.meta.pageTitle"
                class="router-header flex flex-wrap items-center mb-6">
                <div
                  :class="{'pr-4 border-0 md:border-r border-solid border-grey-light' : $route.meta.breadcrumb}"
                  class="content-area__heading">
                  <h2 class="mb-1">
                    {{ routeTitle }}
                  </h2>
                </div>

                <vx-breadcrumb
                  v-if="$route.meta.breadcrumb"
                  :route="$route"
                  :is-rtl="$vs.rtl"
                  class="ml-4 md:block hidden" />

                <vs-dropdown
                  vs-trigger-click
                  class="ml-auto md:block hidden cursor-pointer">
                  <vs-button
                    radius
                    icon="icon-settings"
                    icon-pack="feather" />

                  <vs-dropdown-menu class="w-32">
                    <vs-dropdown-item>
                      <div
                        class="flex items-center"
                        @click="$router.push('/pages/profile').catch(() => {})">
                        <feather-icon
                          icon="UserIcon"
                          class="inline-block mr-2"
                          svg-classes="w-4 h-4" />
                        <span>Profile</span>
                      </div>
                    </vs-dropdown-item>
                    <vs-dropdown-item>
                      <div
                        class="flex items-center"
                        @click="$router.push('/apps/todo').catch(() => {})">
                        <feather-icon
                          icon="CheckSquareIcon"
                          class="inline-block mr-2"
                          svg-classes="w-4 h-4" />
                        <span>Tasks</span>
                      </div>
                    </vs-dropdown-item>
                    <vs-dropdown-item>
                      <div
                        class="flex items-center"
                        @click="$router.push('/apps/email').catch(() => {})">
                        <feather-icon
                          icon="MailIcon"
                          class="inline-block mr-2"
                          svg-classes="w-4 h-4" />
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
                :right="$vs.rtl ? 'calc(100% - 2.2rem - 38px)' : '30px'"
                bottom="5%"
                visibleoffset="500">
                <vs-button
                  class="shadow-lg btn-back-to-top px-3">
                  <feather-icon
                    icon="ArrowUpIcon" />
                </vs-button>
              </back-to-top>

              <transition
                :name="routerTransition"
                mode="out-in">
                <router-view
                  @changeRouteTitle="changeRouteTitle"
                  @setAppClasses="(classesStr) => $emit('setAppClasses', classesStr)" />
              </transition>
            </div>
          </div>
        </div>
      </div>
      <the-footer />
    </div>
  </div>
</template>

<script>
import BackToTop           from "vue-backtotop"
import HNavMenu            from "@/layouts/components/horizontal-nav-menu/HorizontalNavMenu.vue"
// import navMenuItems        from "@/app/sidebarItems.js"
import TheNavbarHorizontal from "@/layouts/components/navbar/TheNavbarHorizontal.vue"
import TheNavbarVertical   from "@/layouts/components/navbar/TheNavbarVertical.vue"
import TheFooter           from "@/layouts/components/TheFooter.vue"
import themeConfig         from "@/../themeConfig.js"
import VNavMenu            from "@/layouts/components/vertical-nav-menu/VerticalNavMenu.vue"

export default {
  components: {
    BackToTop,
    HNavMenu,
    TheFooter,
    TheNavbarHorizontal,
    TheNavbarVertical,
    VNavMenu
  },
  data () {
    return {
      footerType: themeConfig.footerType  || "static",
      hideScrollToTop: themeConfig.hideScrollToTop,
      isNavbarDark: false,
      navbarColor: themeConfig.navbarColor || "#fff",
      navbarType: themeConfig.navbarType  || "floating",
      routerTransition: themeConfig.routerTransition || "none",
      routeTitle: this.$route.meta.pageTitle
    }
  },
  computed: {
    navMenuItems () { return this.$store.getters.sidebarItems},
    bodyOverlay () { return this.$store.state.bodyOverlay },
    contentAreaClass () {
      if (this.mainLayoutType === "vertical") {
        if      (this.verticalNavMenuWidth == "default") {return "content-area-reduced"}
        else if (this.verticalNavMenuWidth == "reduced") {return "content-area-lg"}
        else {return "content-area-full"}
      }
      // else if(this.mainLayoutType === "boxed") return "content-area-reduced"
      else {return "content-area-full"}
    },
    footerClasses () {
      return {
        "footer-hidden": this.footerType == "hidden",
        "footer-sticky": this.footerType == "sticky",
        "footer-static": this.footerType == "static"
      }
    },
    isAppPage () {
      return this.$route.meta.no_scroll
    },
    isThemeDark ()     { return this.$store.state.theme == "dark" },
    layoutTypeClass () { return `main-${this.mainLayoutType}` },
    mainLayoutType ()  { return this.$store.state.mainLayoutType  },
    navbarClasses ()   {
      return {
        "navbar-hidden": this.navbarType == "hidden",
        "navbar-sticky": this.navbarType == "sticky",
        "navbar-static": this.navbarType == "static",
        "navbar-floating": this.navbarType == "floating"
      }
    },
    verticalNavMenuWidth () { return this.$store.state.verticalNavMenuWidth },
    windowWidth ()          { return this.$store.state.windowWidth }
  },
  watch: {
    "$route" () {
      this.routeTitle = this.$route.meta.pageTitle
    },
    isThemeDark (val) {
      const color = this.navbarColor == "#fff" && val ? "#10163a" : "#fff"
      this.updateNavbarColor(color)
    },
    "$store.state.mainLayoutType" (val) {
      this.setNavMenuVisibility(val)
    }
  },
  created () {
    const color = this.navbarColor == "#fff" && this.isThemeDark ? "#10163a" : this.navbarColor
    this.updateNavbarColor(color)
    this.setNavMenuVisibility(this.$store.state.mainLayoutType)
  },
  methods: {
    changeRouteTitle (title) {
      this.routeTitle = title
    },
    updateNavbar (val) {
      if (val == "static") {this.updateNavbarColor(this.isThemeDark ? "#10163a" : "#fff")}
      this.navbarType = val
    },
    updateNavbarColor (val) {
      this.navbarColor = val
      if (val == "#fff") {this.isNavbarDark = false}
      else {this.isNavbarDark = true}
    },
    updateFooter (val) {
      this.footerType = val
    },
    setNavMenuVisibility (layoutType) {
      if ((layoutType === "horizontal" && this.windowWidth >= 1200) || (layoutType === "vertical" && this.windowWidth < 1200)) {
        this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", false)
        this.$store.dispatch("updateVerticalNavMenuWidth", "no-nav-menu")
      }
      else {
        this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", true)
      }
    },
    toggleHideScrollToTop (val) {
      this.hideScrollToTop = val
    }
  }
}

</script>

