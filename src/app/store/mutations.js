import {get} from "lodash"
const mutations = {
  SET_TOKEN (state, token) {
    state.token = token
  },
  TOGGLE_DARK_MODE (state, payload) {
    const darkMode = get(payload, "darkmode")
    localStorage.setItem("theme", darkMode ? "dark" : "light")
    if (!!darkMode) {
      state.theme = "dark"
    }
    else {
      state.theme = "light"
    }
  },
  DO_LOGOUT_USER () {
    localStorage.clear()
    window.location = "/login"
  }
}
export default mutations
