import Vue from "vue"
import moment from "moment"

Vue.filter("capitalize", function (value) {
  if (!value) {return ""}
  value = value.toString()
  const arr = value.split(" ")
  const capitalizedArray = []
  arr.forEach((word) => {
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1)
    capitalizedArray.push(capitalized)
  })
  return capitalizedArray.join(" ")
})

Vue.filter("formatDate", function (value) {
  return value ? moment(String(value)).format("Do MMM, YY – h:mm A") : value
})

Vue.filter("elapsedTime", function (startTime) {
  const x = new Date(startTime)
  const now = new Date()
  let timeDiff = now - x
  timeDiff /= 1000

  const seconds = Math.round(timeDiff)
  timeDiff = Math.floor(timeDiff / 60)

  const minutes = Math.round(timeDiff % 60)
  timeDiff = Math.floor(timeDiff / 60)

  const hours = Math.round(timeDiff % 24)
  timeDiff = Math.floor(timeDiff / 24)

  const days = Math.round(timeDiff % 365)
  timeDiff = Math.floor(timeDiff / 365)

  const years = timeDiff

  if (years > 0) {
    return years + (years > 1 ? " Years " : " Year ") + "ago"
  } else if (days > 0) {
    return days + (days > 1 ? " Days " : " Day ") + "ago"
  } else if (hours > 0) {
    return hours + (hours > 1 ? " Hrs " : " Hour ") + "ago"
  } else if (minutes > 0) {
    return minutes + (minutes > 1 ? " Mins " : " Min ") + "ago"
  } else if (seconds > 1) {
    return `${seconds} Secs ago`
  }

  return "Just Now"
})

Vue.filter("truncate", function (value, limit) {
  return value.substring(0, limit)
})

Vue.filter("tailing", function (value, tail) {
  return value + tail
})

Vue.filter("time", function (value, is24HrFormat = false) {
  if (value) {
    const date = new Date(Date.parse(value))
    let hours = date.getHours()
    const min = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
    if (!is24HrFormat) {
      const time = hours > 12 ? "AM" : "PM"
      hours = hours % 12 || 12
      return hours + ":" + min + " " + time
    }
    return hours + ":" + min
  }
})

Vue.filter("date", function (value, fullDate = false) {
  value = String(value)
  const date = value.slice(8, 10).trim()
  const month = value.slice(4, 7).trim()
  const year = value.slice(11, 15)

  if (!fullDate) {return date + " " + month}
  else {return date + " " + month + " " + year}
})

Vue.filter("month", function (val, showYear = true) {
  val = String(val)

  const regx = /\w+\s(\w+)\s\d+\s(\d+)./
  if (!showYear) {
    return regx.exec(val)[1]
  } else {
    return regx.exec(val)[1] + " " + regx.exec(val)[2]
  }

})

Vue.filter("csv", function (value) {
  return value.join(", ")
})

Vue.filter("filter_tags", function (value) {
  return value.replace(/<\/?[^>]+(>|$)/g, "")
})

Vue.filter("k_formatter", function (num) {
  return num > 999 ? (num / 1000).toFixed(1) + "k" : num
})
