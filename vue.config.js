
module.exports = {
  outputDir: "dist/",
  assetsDir: "src/",
  configureWebpack: {
    devtool: "source-map",
    module: {
      rules: [{
        test: /\.svg$/,
        loader: "vue-svg-loader"
      }]
    }
  },
  chainWebpack: (config) => {
    config.module.rules.delete("svg")
  }
}
