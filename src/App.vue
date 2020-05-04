<template>
  <div
    v-show="$store.state.routeLoaded"
    id="app">
    <v-app>
      <SideNav
        v-if="showSidenav"
        dark
        :drawer.sync="drawer"
        :full.sync="full"
        @logout="logout" />

      <TopBar
        v-if="showTopnav"
        @navBtnClick="drawer = !drawer" />

      <v-content clipped>
        <v-container fluid>
          <router-view :key="$route.fullPath" />
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
