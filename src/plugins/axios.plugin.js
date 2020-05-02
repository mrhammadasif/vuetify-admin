import Axios from "axios"
import store from "../store/index"

export default function (config) {
  Axios.interceptors.request.use((request) => {
    request.headers.Authorization = store.getters.authToken
    return request
  })

  Axios.defaults.baseURL = `${config.API_BASE_URL}`
  Axios.defaults.headers.common["Content-type"] = "application/json"
}
