import config from "@/app/config.js"
import axios from "axios"
import store from "@/store/store"

export default function () {
  axios.interceptors.request.use((req) => {
    req.headers.Authorization = store.getters.token
    return req
  })

  axios.defaults.baseURL = config.base_url
  axios.defaults.headers.common["Content-type"] = "application/json"
}
