import config from "../../api_config"
import axios from "axios"
import store from "@/store/store"

export default function () {

  console.info("adding config of axios ....")
  axios.interceptors.request.use((config) => {
    config.headers.Authorization = store.getters.token
    config.headers["Content-type"] = "application/json; charset=utf-8"
    return config
  })

  axios.defaults.baseURL = config.ADMINBASE
  // axios.defaults.headers.common["Content-type"] = "application/json; charset=utf-8"

}
