const path = require('path')
const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base')

// @ts-ignore
module.exports = merge(webpackBaseConfig, {
	mode: 'production',
	cache: true,
	optimization: {
		minimize: true,
	},
	devServer: {
		static: {
			directory: path.join(__dirname, "../dist"),
		},
		client: {
			overlay: false
		},
		port: 3000,
		compress: true,
		historyApiFallback: true,
	},
})
