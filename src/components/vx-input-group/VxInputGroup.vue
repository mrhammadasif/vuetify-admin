<template functional>
  <div
    :class="data.staticClass"
    class="vx-input-group flex">
    <div
      v-if="slots().prepend"
      :class="props.prependClasses"
      class="vx-input-group-prepend flex">
      <slot name="prepend"></slot>
    </div>

    <div class="vx-input-group-default flex-grow">
      <slot></slot>
    </div>

    <div
      v-if="slots().append"
      :class="props.appendClasses"
      class="vx-input-group-append flex">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "VxInputGroup",
  props: {
    prependClasses: {
      type: String,
      default: null
    },
    appendClasses: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/components/vxInputGroup.scss";
</style>
