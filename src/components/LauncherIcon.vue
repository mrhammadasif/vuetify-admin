<template>
  <v-sheet
    class="py-6 text-center launcher-icon"
    color="primary"
    dark>
    <v-icon>{{ app.icon }}</v-icon>
    <div class="title">
      {{ app.title }}
    </div>
  </v-sheet>
</template>

<script>
export default {
  props: [
    "app"
  ],
  data: function () {
    return {
      dropdown: false,
      hover: false
    }
  }
}
</script>

<style lang="scss">
.launcher-icon:hover {
  background: #000;
}
</style>
