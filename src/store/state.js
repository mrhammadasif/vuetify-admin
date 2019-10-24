import themeConfig from "@/../themeConfig.js"

const state = {
  isSidebarActive: true,
  breakpoint: null,
  sidebarWidth: "default",
  reduceButton: themeConfig.sidebarCollapsed,
  bodyOverlay: false,
  sidebarItemsMin: false,
  theme: themeConfig.theme || "light",
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
