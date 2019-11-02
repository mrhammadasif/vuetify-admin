const api = {
  APIBASE: "https://isv-api.herokuapp.com/",
  NAME: "ISV Admin",

  // below will be set later below
  ADMINBASE: "",
  GEOBASE: ""
}

const hostname = window.location.hostname
if (hostname.match(RegExp("localhost", "ig"))) {
  api.APIBASE = "https://localhost:42010/"
}
api.ADMINBASE =  `${api.APIBASE}admin`
api.GEOBASE = `${api.APIBASE}geo`

export default api
