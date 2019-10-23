// import {routes} from "@/router"
// import {get} from "lodash"

const sideItems = [
  {
    name: "Overview",
    url: "/",
    slug: "dashboard",
    icon: "PieChartIcon"
  },
  {
    icon: "UserIcon",
    header: "Users"
  },
  {
    name: "List all Users",
    url: "/users",
    slug: "/users",
    icon: "UsersIcon"
  },
  {
    name: "Add New User",
    url: "/users/add",
    slug: "/users/add",
    icon: "PlusIcon"
  },
  {
    icon: "ServiceIcon",
    header: "Services"
  },
  {
    name: "List all Services",
    url: "/services",
    slug: "/services",
    icon: "UsersIcon"
  },
  {
    name: "Add New Service",
    url: "/services/add",
    slug: "/services/add",
    icon: "PlusIcon"
  },
  {
    icon: "CircleIcon",
    header: "Proposals"
  },
  {
    name: "List all Proposals",
    url: "/proposals",
    slug: "/proposals",
    icon: "CircleIcon"
  },
  {
    name: "Add New Proposal",
    url: "/proposals/add",
    slug: "/proposals/add",
    icon: "PlusIcon"
  },
  {header: "Payments"},
  {
    name: "View Transactions",
    url: "/transactions",
    slug: "/transactions",
    icon: "DollarSignIcon"
  }
]
// routes.map((route) => route.children).reduce((route, currentElem) => route.concat(currentElem), [])
//   .filter((r) => get(r, "sideNav"))
//   .forEach((route) => {
//     sideItems.push({
//       name: route.label,
//       url: route.path,
//       slug: route.name,
//       icon: get(route, "icon") || "ArrowRightIcon"
//     })
//   })

export default sideItems
