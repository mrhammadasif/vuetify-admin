// MAIN COLORS - VUESAX THEME COLORS
const colors = {
  primary: "#006fcc",
  secondary: "#f4f7fc",
  success: "#28C76F",
  danger: "#EA5455",
  warning: "#FF9F43",
  dark: "#333333"
}

import Vue from "vue"
import Vuesax from "vuesax"
Vue.use(Vuesax, {theme: {colors}})

// CONFIGS
const themeConfig = {
  theme: "light", // options[String]: 'light'(default), 'dark', 'semi-dark'
  sidebarCollapsed: false, // options[Boolean]: true, false(default)
  navbarColor: "#ddd", // options[String]: HEX color / rgb / rgba / Valid HTML Color name - (default: #fff)
  navbarType: "sticky", // options[String]: floating(default) / static / sticky / hidden
  footerType: "hidden", // options[String]: static(default) / sticky / hidden
  routerTransition: "slide-fade", // options[String]: zoom-fade / slide-fade / fade-bottom / fade / zoom-out / none(default)
  hideScrollToTop: false, // options[Boolean]: true, false(default)
  disableThemeTour: false // options[Boolean]: true, false(default)
  // NOTE: themeTour will be disabled in screens < 1200. Please refer docs for more info.
}

export default themeConfig
