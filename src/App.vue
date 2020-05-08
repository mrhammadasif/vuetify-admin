<template>
  <div>
    <v-app v-show="$store.state.routeLoaded">
      <side-nav
        v-if="showSidenav"
        :key="oppFull"
        :drawer.sync="drawer"
        :full.sync="full"
        @navBtnClick="full = !full"
        @logout="logout" />

      <top-bar
        v-if="showTopnav"
        :color="$vuetify.theme.dark ? 'primary' : 'primary'">
        <template #addons>
        </template>
      </top-bar>

      <v-content
        clipped
        class="bg">
        <v-progress-linear

          :active="$loading.loaders.length > 0"
          absolute
          top
          :indeterminate="true"></v-progress-linear>
        <v-container
          fluid>
          <vue-page-transition name="fade-in-up">
            <router-view
              :key="$route.fullPath" />
          </vue-page-transition>
          <my-toast />
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import SideNav from "@/partials/Sidenav.vue"
import TopBar from "@/partials/TopBar.vue"
import MyToast from "@/plugins/toast/Toast.vue"

export default {
  components: {
    SideNav,
    MyToast,
    TopBar
  },
  data: function () {
    return {
      showSidenav: true,
      showTopnav: true,
      drawer: true,
      full: true
    }
  },
  computed: {
    oppFull () {
      return !this.full
    }
  },
  watch: {
    "$route.meta.layout" (v) {
      switch (v) {
      case "full":
        this.showSidenav = false
        this.showTopnav = false
        break
      case "topnav":
        this.showSidenav = true
        this.showTopnav = true
        this.full = false
        this.drawer = false
        break
      default:
        this.full = true
        this.drawer = true
        this.showSidenav = true
        this.showTopnav = true
        break
      }
    }
  },
  methods: {
    logout () {
      this.$router.push("/logout")
    }
  }
}
</script>
