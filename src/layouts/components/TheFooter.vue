<!-- =========================================================================================
    File Name: TheFooter.vue
    Description: Footer component
    Component Name: TheFooter
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <footer
    :class="classes"
    class="the-footer flex-wrap justify-between">
    <span>COPYRIGHT @ {{ new Date().getFullYear() }}, All rights Reserved</span>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
  props: {
    classes: {
      type: String,
      default: ""
    }
  }
}
</script>
