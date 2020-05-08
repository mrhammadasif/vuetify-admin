<template>
  <v-app-bar
    v-bind="$attrs"
    dense
    class="align-end"
    app>
    <slot name="addons"></slot>
    <v-toolbar-title>{{ $config.APP_TITLE }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-switch
      v-model="darkMode"
      color="dark"
      class="mt-4"
      prepend-icon="mdi-theme-light-dark"
      inset />
  </v-app-bar>
</template>
<script>
export default {
  data () {
    return {
      darkMode: JSON.parse(localStorage.getItem("darkMode"))
    }
  },
  watch: {
    darkMode (v) {
      this.$vuetify.theme.dark = !!v
      localStorage.setItem("darkMode", v)
    }
  }
}
</script>
