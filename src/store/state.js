
import themeConfig from "@/../themeConfig.js"
import colors from "@/../themeConfig.js"

const state = {
  token: "",
  isSidebarActive: true,
  breakpoint: null,
  sidebarWidth: "default",
  reduceButton: themeConfig.sidebarCollapsed,
  bodyOverlay: false,
  sidebarItemsMin: false,
  theme: themeConfig.theme || "light",
  themePrimaryColor: colors.primary,
  userRole: null,
  // Can be used to get current window with
  // Note: Above breakpoint state is for internal use of sidebar component
  windowWidth: null,
  tenants: [],
  currentTenant: "",
  username: "",
  email: "",
  photoUrl: ""
}

export default state
