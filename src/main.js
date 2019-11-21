
import VueApp from "vue"
import App from "./App.vue"

// Axios – and load axios defaults config keys
import loadAxiosConfig from "@/plugins/axios.config.js"
loadAxiosConfig()

// Vuesax Component Framework
import Vuesax from "vuesax"
import "material-icons/iconfont/material-icons.css" //Material Icons
import "vuesax/dist/vuesax.css" // Vuesax
VueApp.use(Vuesax)

// App.hammad

// Theme Configurations
import "../themeConfig.js"

// Globally Registered Components
import "./globalComponents.js"

// Styles: SCSS
import "./assets/scss/main.scss"

// Tailwind
import "@/assets/css/main.css"

// Vue Router
import router from "./router"

// Vuex Store
import store from "./store/store"

// Vuesax Admin Filters
import "./filters/filters"

// Vuejs - Vue wrapper for hammerjs
import {VueHammer} from "vue2-hammer"
VueApp.use(VueHammer)

import VueTour from "vue-tour"
VueApp.use(VueTour)
require("vue-tour/dist/vue-tour.css")

// PrismJS
import "prismjs"
import "prismjs/themes/prism-tomorrow.css"

// Feather font icon
require("./assets/css/iconfont.css")

import SequentialEntrance from "vue-sequential-entrance"
import "vue-sequential-entrance/vue-sequential-entrance.css"
VueApp.use(SequentialEntrance)

VueApp.config.productionTip = false

// for forms validation
import VeeValidate from "vee-validate"
VueApp.use(VeeValidate)

import myUtils from "./utils"
VueApp.use(myUtils)
import config from "@/app/config"
VueApp.prototype.$config = config

new VueApp({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app")
