import Vue from "vue"
import Toast from "./Toast.vue"

const queue = []
let showing = false

const toaster = {
  success (msgToShow, options = {
    title: null,
    closeText: null,
    callback: () => {}
  }) {
    this.open({
      text: msgToShow,
      type: "success",
      title: options.title,
      closeText: options.closeText,
      callback: options.callback
    })
  },
  error (msgToShow, options = {
    title: "Something goes wrong",
    closeText: null,
    callback: () => {}
  }) {
    this.open({
      text: msgToShow,
      type: "error",
      title: options.title,
      closeText: options.closeText,
      callback: options.callback
    })
  },
  open (params) {
    if (!params.text) {return console.error("[toast] no text supplied")}
    if (!params.type) {params.type = "info"}

    const propsData = {
      title: params.title,
      text: params.text,
      type: params.type,
      closeText: params.closeText,
      callback: params.callback
    }

    const defaultOptions = {
      color: params.type || "info",
      closeable: true,
      autoHeight: true,
      timeout: 3000,
      multiLine: true
      // multiLine: !!params.title || params.text.length > 80
    }

    params.options = Object.assign(defaultOptions, params.options)
    propsData.options = params.options

    // push into queue
    queue.push(propsData)
    processQueue()
  }
}

function processQueue () {
  if (queue.length < 1) {return}
  if (showing) {return}

  const nextInLine = queue[0]
  spawn(nextInLine)
  showing = true

  queue.shift()
}

function spawn (propsData) {
  const ToastComponent = Vue.extend(Toast)
  return new ToastComponent({
    el: document.createElement("div"),
    propsData,
    onClose: function () {
      showing = false
      processQueue()
    }
  })
}

export default {
  install (Vue) {
    Vue.prototype.$toast = toaster
  }
}
