const path = require('path')
const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base')

module.exports = merge(webpackBaseConfig, {
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
		client: {
			overlay: false
		},
		port: 3000,
		hot: true,
		compress: false,
		historyApiFallback: true,
	},
})