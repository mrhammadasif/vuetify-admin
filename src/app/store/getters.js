import * as moment from "moment"
import sidebarItems from "@/app/sidebar-items.js"

const getters = {
  today: (state) => {return moment(state.now)},
  sidebarItems: (state) => {
    const r = [].concat(sidebarItems)
    if (Array.isArray(state.favoriteDashboards) && state.favoriteDashboards.length > 0) {
      r.push({
        header: "Favorite Dashboards",
        icon: "HeartIcon",
        items: state.favoriteDashboards
      })
    }
    return r
  }
}
export default getters
