<template>
  <v-snackbar
    v-model="open"
    bottom
    multi-line
    v-bind="options">
    <div class="ctn">
      <div
        v-if="title"
        class="title mb-2">
        {{ title }}
      </div>
      <div class="txt">
        {{ text }}
      </div>
    </div>
    <v-btn
      v-if="options.closeable"
      text
      icon
      @click.native="onClose">
      <v-icon v-if="!closeText">
        mdi-close
      </v-icon>
      <span v-else>{{ closeText }}</span>
    </v-btn>
  </v-snackbar>
</template>

<script>
/* eslint-disable vue/require-default-prop */

export default {
  name: "Toast",
  props: {
    title: String,
    text: String,
    type: String,
    callback: Function,
    options: Object,
    closeText: String
  },
  data () {
    return {
      open: false
    }
  },
  watch: {
    open: function (val) {
      if (!val) {
        this.close()
      }
    }
  },
  beforeMount () {
    document.querySelector("#app").appendChild(this.$el)
  },
  mounted () {
    this.open = true
  },
  methods: {
    onClose () {
      this.open = false
      if (typeof this.callback == "function") {
        this.callback()
      }
    },
    close () {
      if (this.open) {this.open = false}
      setTimeout(() => {
        this.$options.onClose()
        this.$destroy()
        removeElement(this.$el)
      }, 700) // wait for close animation
    }
  }
}

function removeElement (el) {
  if (typeof el.remove !== "undefined") {
    el.remove()
  } else {
    el.parentNode.removeChild(el)
  }
}
</script>
