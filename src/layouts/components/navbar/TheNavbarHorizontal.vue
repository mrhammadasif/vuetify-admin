<!-- =========================================================================================
  File Name: TheNavbar.vue
  Description: Navbar component
  Component Name: TheNavbar
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="relative">
    <div class="vx-navbar-wrapper navbar-full p-0">
      <vs-navbar
        :class="navbarClasses"
        :style="navbarStyle"
        :color="navbarColor"
        class="navbar-custom navbar-skelton">
        <div class="flex justify-between w-full items-center">
          <router-link
            tag="div"
            to="/"
            class="vx-logo cursor-pointer flex items-center">
            <logo class="w-10 mr-4 fill-current text-danger" />
            <span class="vx-logo-text text-primary">{{ $config.app_name }}</span>
          </router-link>
          <span class="flex-grow"></span>
          <div
            class="flex items-center"
            marginx>
            <HelpMenu />
            <notification-drop-down />
          </div>
          <profile-drop-down />
        </div>
      </vs-navbar>
    </div>
  </div>
</template>

<script>
import Bookmarks            from "./components/Bookmarks.vue"
import SearchBar            from "./components/SearchBar.vue"
import NotificationDropDown from "./components/NotificationDropDown.vue"
import ProfileDropDown      from "@/app/components/ProfileDropDown.vue"
import HelpMenu from "@/app/components/HelpMenu.vue"
import Logo                 from "../Logo.vue"
// import DarkModeToggler from "@/app/components/DarkModeToggler.vue"

export default {
  name: "TheNavbarHorizontal",
  components: {
    Logo,
    HelpMenu,
    // DarkModeToggler,
    // Bookmarks,
    // SearchBar,

    NotificationDropDown,
    ProfileDropDown
  },
  props: {
    logo: {
      type: String,
      default: ""
    },
    navbarType: {
      type: String,
      required: true
    }
  },
  computed: {
    navbarColor () {
      let color = "#fff"
      if (this.navbarType === "sticky") {color = "#f7f7f7"}
      else if (this.navbarType === "static") {
        if (this.scrollY < 50) {
          color = "#f7f7f7"
        }
      }

      this.isThemedark === "dark" ? color === "#fff" ? color = "#10163a" : color = "#262c49" : null

      return color
    },
    isThemedark ()          { return this.$store.state.theme                                                                       },
    navbarStyle ()          { return this.navbarType === "static" ? {transition: "all .25s ease-in-out"} : {}                      },
    navbarClasses ()        { return this.scrollY > 5 && this.navbarType === "static" ? null : "d-theme-dark-light-bg shadow-none" },
    scrollY ()              { return this.$store.state.scrollY                                                                     },
    verticalNavMenuWidth () { return this.$store.state.verticalNavMenuWidth                                                        },
    windowWidth ()          { return this.$store.state.windowWidth                                                                 }
  }
}

</script>

