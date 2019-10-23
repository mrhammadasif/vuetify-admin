const express = require("express")
const history = require("connect-history-api-fallback")
const app = express()
const staticFileMiddleware = express.static("dist")
app.use(history({verbose: true}))
app.use(staticFileMiddleware)
app.listen(process.env.PORT || 8080, () => {
  console.log(`Server running at http://localhost:${process.env.PORT || 8080}/`)
})
