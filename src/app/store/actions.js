let timerId = null
const actions = {
  startTimer ({commit}) {
    timerId = setInterval(() => {
      commit("updateTime")
    }, 1000)
  },
  stopTimer (){
    clearInterval(timerId)
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
