
<template>
  <footer
    :class="classes"
    class="the-footer flex-wrap justify-between"
  >
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
