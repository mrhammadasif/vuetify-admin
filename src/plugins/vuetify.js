import Vue from "vue"
import Vuetify from "vuetify"
import "vuetify/dist/vuetify.min.css"

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: JSON.parse(localStorage.getItem("darkMode")),
    themes: {
      light: {
        primary: "#d12026",
        secondary: "#222222",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107"
      },
      dark: {
        primary: "#d12026"
      }
    }
  }
})
