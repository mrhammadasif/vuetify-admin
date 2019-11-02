import config from "@/config"
import axios from "axios"
import store from "@/store/store"
import get from "lodash/get"

export default function () {

  console.info("adding config of axios ....")
  axios.interceptors.request.use((config) => {
    config.headers.Authorization = store.state.token
    config.headers["Content-type"] = "application/json; charset=utf-8"
    return config
  })

  axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  }, function (error) {
    // if(error)
    // debugger
    if (get(error, "response.status") == 401) {
      store.dispatch("logoutUser")
    }
    return Promise.reject(error)
  })

  // axios.defaults.headers.common.Authorization = store.state.token
  axios.defaults.baseURL = config.ADMINBASE
  // axios.defaults.headers.common["Content-type"] = "application/json; charset=utf-8"
}
