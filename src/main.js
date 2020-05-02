import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import "roboto-fontface/css/roboto/roboto-fontface.css"
import "@mdi/font/css/materialdesignicons.css"

import validationRules from "./plugins/validation-rules"
Vue.use(validationRules)

import vuetifyToastEngine from "./plugins/toast/toast"
Vue.use(vuetifyToastEngine)

Vue.config.productionTip = false
fetch("./" + process.env.BASE_URL + "/config.json")
  .then((data) => {
    return data.json()
  })
  .then((config) => {
    Vue.prototype.$config = config
    new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App)
    }).$mount("#app")
  })
  .catch((e) => {
    document.write("Unable to load config! Contact Webmaster")
    console.error(e)
  })
