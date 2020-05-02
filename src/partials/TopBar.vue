<template>
  <v-app-bar
    dense
    class="align-end"
    app>
    <v-app-bar-nav-icon
      @click.stop="$emit('navBtnClick')" />
    <v-toolbar-title>{{ $config.APP_TITLE }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-switch
      v-model="darkMode"
      class="mt-4"
      prepend-icon="mdi-theme-light-dark"
      inset />
  </v-app-bar>
</template>
<script>
export default {
  data: function () {
    return {
      darkMode: false
    }
  },
  watch: {
    darkMode (v) {
      this.$vuetify.theme.dark = !!v
    }
  }
}
</script>
