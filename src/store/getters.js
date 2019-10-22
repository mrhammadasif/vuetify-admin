
// COMPONENT
// vx-autosuggest
// starredPages: state => state.navbarSearchAndPinList.data.filter((page) => page.highlightAction)
const getters = {
  token () {
    return sessionStorage.getItem("userToken")
  }
}
export default getters
