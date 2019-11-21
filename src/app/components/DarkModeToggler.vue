<template>
  <vx-tooltip
    text="Toggle Dark Mode"
    position="bottom">
    <!-- :vs-icon-on="'brightness_low'"
          :vs-icon-off="'brightness_high'" -->
    <vs-switch
      v-model="isDarkModeOn"
      color="dark">
      <span slot="on">Light Mode</span>
      <span slot="off">Dark Mode</span>
    </vs-switch>
  </vx-tooltip>
</template>

<script>
export default {
  data: () => ({isDarkModeOn: localStorage.getItem("theme") == "dark"}),
  watch: {
    "isDarkModeOn" () {
      this.$store.dispatch("toggleDarkMode", {
        $vs: this.$vs,
        darkMode: this.isDarkModeOn
      })
    }
  }
}
</script>
