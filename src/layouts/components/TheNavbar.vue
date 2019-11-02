<template>
  <div class="relative">
    <div class="vx-navbar-wrapper">
      <vs-navbar
        :class="classObj"
        class="vx-navbar navbar-custom">
        <!-- SM - OPEN SIDEBAR BUTTON -->
        <feather-icon
          class="sm:inline-flex xl:hidden cursor-pointer mr-1"
          icon="MenuIcon"
          @click.stop="showSidebar" />
        <!-- v-if="breakpoint != 'md'" -->

        <!-- <VxBreadcrumb /> -->
        <vs-spacer />

        <!-- USER META -->
        <div class="the-navbar__user-meta flex items-center ml-2">
          <div class="text-right leading-tight sm:block">
            <p>Welcome</p>
          </div>
          <vs-dropdown
            vs-custom-content
            vs-trigger-click
            class="cursor-pointer">
            <div class="con-img ml-3 flex items-center">
              <!-- v-if="activeUserImg.startsWith('http')"
                :src="activeUserImg" -->

              <vs-icon
                size="32px"
                icon="account_circle" />
              <vs-icon
                size="24px"
                icon="arrow_drop_down" />
            </div>
            <vs-dropdown-menu class="vx-navbar-dropdown">
              <ul style="min-width: 12rem">
                <li
                  class="flex py-2 px-4 cursor-pointer hover:font-bold"
                  @click="isDarkModeOn = !isDarkModeOn">
                  <feather-icon
                    icon="MoonIcon"
                    svg-classes="w-4 h-4" /> <span class="ml-2">{{ isDarkModeOn ? 'Light Mode' :'Dark Mode' }}</span>
                </li>
                <li
                  class="flex py-2 px-4 cursor-pointer hover:font-bold"
                  @click="logout">
                  <feather-icon
                    icon="LogOutIcon"
                    svg-classes="w-4 h-4" /> <span class="ml-2">Logout</span>
                </li>
              </ul>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </vs-navbar>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar"
import draggable from "vuedraggable"
import VxBreadcrumb from "./VxBreadcrumb.vue"
// import {mapGetters, mapActions} from "vuex"
import Popper from "vue-popperjs"
import "vue-popperjs/dist/vue-popper.css"

export default {
  name: "TheNavbar",
  directives: {
    "click-outside": {
      bind: function (el, binding) {
        const bubble = binding.modifiers.bubble
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler
        document.addEventListener("click", handler)
      },

      unbind: function (el) {
        document.removeEventListener("click", el.__vueClickOutside__)
        el.__vueClickOutside__ = null
      }
    }
  },
  // components: {
  // VuePerfectScrollbar,
  // draggable,
  // VxBreadcrumb,
  // Popper
  // },
  props: {
    showBookmarkContainer: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      isDarkModeOn: localStorage.getItem("theme") == "dark",
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      },
      autoFocusSearch: false
    }
  },
  computed: {
    // HELPER
    sidebarWidth () {
      return this.$store.state.sidebarWidth
    },
    breakpoint () {
      return this.$store.state.breakpoint
    },

    // NAVBAR STYLE
    classObj () {
      if (this.sidebarWidth == "default") {return "navbar-default"}
      else if (this.sidebarWidth == "reduced") {return "navbar-reduced"}
      else if (this.sidebarWidth) {return "navbar-full"}
      return ""
    },

    // BOOKMARK & SEARCH
    data () {
      return this.$store.state.navbarSearchAndPinList
    },

    userDisplayName () {
      // return "john_doe"
      return `Dummy Name ${1}`
    }
  },
  watch: {
    "$route" () {
      if (this.showBookmarkPagesDropdown) {this.showBookmarkPagesDropdown = false}
    },
    "isDarkModeOn" () {
      this.$store.dispatch("toggleDarkMode", {
        $vs: this.$vs,
        darkMode: this.isDarkModeOn
      })
    }
  },
  methods: {
    async logout () {
      await this.$store.dispatch("logoutUser")
      this.$vs.notify({text: "You have been logged out"})
      this.$router.replace("/login")
    },
    showSidebar () {
      this.$store.commit("TOGGLE_IS_SIDEBAR_ACTIVE", true)
    }
  }
}
</script>
