module.exports = {
  productionSourceMap: false,
  configureWebpack (config) {
    if (process.env.NODE_ENV == "development") {
      config.devtool = "source-map"
    }
  }
}
