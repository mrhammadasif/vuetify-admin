const api = {
  APIBASE: "https://isv-api.herokuapp.com/admin",
  NAME: "ISV Admin"
}
const hostname = window.location.hostname
if (hostname.match(RegExp("localhost", "ig"))) {
  api.APIBASE = "https://localhost:42010/admin"
}

export default api
