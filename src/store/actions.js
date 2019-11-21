
// import axios from "axios"
// import VueApp from "vue"

const actions = {

  // ////////////////////////////////////////////
  // SIDEBAR & UI UX
  // ////////////////////////////////////////////
  toggleDarkMode ({commit}, payload) {
    commit("TOGGLE_DARK_MODE", payload)
  },
  updateSidebarWidth ({commit}, width) {
    commit("UPDATE_SIDEBAR_WIDTH", width)
  },
  updateWindowWidth ({commit}, width) {
    commit("UPDATE_WINDOW_WIDTH", width)
  },
  loginUser ({commit}, token) {
    sessionStorage.setItem("userToken", token)
    commit("SET_TOKEN", token)
  },
  logoutUser ({commit}) {
    sessionStorage.clear()
    commit("SET_TOKEN", null)
    window.location = "/"
  }
}

export default actions
