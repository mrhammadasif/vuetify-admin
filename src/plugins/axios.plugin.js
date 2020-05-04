import Axios from "axios"
import store from "../store/index"

export default function (config) {
  Axios.interceptors.request.use((request) => {
    request.headers.Authorization = store.getters.authToken
    request.headers["Content-Type"] = "application/json; charset=utf-8"
    return request
  })

  Axios.defaults.baseURL = `${config.API_BASE_URL}`
}
