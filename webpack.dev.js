const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
    static: "./dist",
    hot: true,
    open: true,
    port: 8080, // Use a different port for sandbox
  },
});