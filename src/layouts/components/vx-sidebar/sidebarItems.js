import {routes} from "@/router"
import {startCase, get} from "lodash"

const sideItems = []
routes.map((route) => route.children).reduce((route, currentElem) => route.concat(currentElem), [])
  .filter((r) => get(r, "sideNav"))
  .forEach((route) => {
    sideItems.push({
      name: route.label,
      url: route.path,
      slug: route.name,
      icon: get(route, "icon") || "ArrowRightIcon"
    })
  })

export default sideItems
