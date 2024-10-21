const path = require('path');
const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./rspack.base');

const devConfig = {
  mode: "development",
  devtool: "eval-source-map",
  cache: false,
  optimization: {
    minimize: false,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "../dist"),
    },
    port: 3000,
    hot: true,
    compress: false,
    historyApiFallback: true,
  },
};

const mergedConfig = merge(webpackBaseConfig, devConfig);

console.log('Exporting merged config');
module.exports = mergedConfig;