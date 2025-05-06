const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Remove HtmlWebpackPlugin from the common config
const filteredCommon = {
  ...common,
  plugins: common.plugins.filter(
    plugin => plugin.constructor.name !== 'HtmlWebpackPlugin'
  )
};

module.exports = merge(filteredCommon, {
  mode: 'development',
  entry: './src/sandbox/index.js',
  devtool: 'eval-source-map',
  devServer: {
    static: './dist',
    hot: true,
    open: true,
    port: 8081,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/sandbox/template.html',
      filename: 'index.html',
    }),
  ],
});
