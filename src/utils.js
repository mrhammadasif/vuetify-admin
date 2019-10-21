// this script contains application related
// codes and hacks, like filters, etc
import round from "lodash/round"
export default {
  install (Vue) {
    Vue.prototype.$sleep = function (timeToSleep){
      return new Promise((res) => setTimeout(res, timeToSleep))
    }

    Vue.prototype.$timeDifference = function (a, b) {
      const date1 = new Date(a)
      const date2 = new Date(b)
      const diffTime = Math.abs(date2.getTime() - date1.getTime())
      return round(diffTime / (1000.0 * 60.0), 2)
    }
  }
}
