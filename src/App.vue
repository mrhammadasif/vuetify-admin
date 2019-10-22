
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import themeConfig from "@/../themeConfig.js"

export default {
  watch: {
    "$store.state.theme" (val) {
      this.toggleClassInBody(val)
    }
  },
  mounted () {
    this.toggleClassInBody(themeConfig.theme)
    this.$nextTick(() => {
      window.addEventListener("resize", this.handleWindowResize)
      this.$store.dispatch("toggleDarkMode", {
        darkMode: localStorage.getItem("theme") == "dark",
        $vs: this.$vs
      })

    })
    this.$store.dispatch("updateWindowWidth", window.innerWidth)

    // this.$root.changeFavicon(appConfig.LOGO)
  },
  beforeDestroy () {
    window.removeEventListener("resize", this.handleWindowResize)
  },
  methods: {
    toggleClassInBody (className) {
      if (className == "dark") {
        if (document.body.className.match("theme-semi-dark")) {document.body.classList.remove("theme-semi-dark")}
        document.body.classList.add("theme-dark")
      } else if (className == "semi-dark") {
        if (document.body.className.match("theme-dark")) {document.body.classList.remove("theme-dark")}
        document.body.classList.add("theme-semi-dark")
      } else {
        if (document.body.className.match("theme-dark")) {document.body.classList.remove("theme-dark")}
        if (document.body.className.match("theme-semi-dark")) {document.body.classList.remove("theme-semi-dark")}
      }
    },
    handleWindowResize (event) {
      this.$store.dispatch("updateWindowWidth", event.currentTarget.innerWidth)
    }
  }
}

</script>
