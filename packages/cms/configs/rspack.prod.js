const path = require('path')
const { merge } = require('webpack-merge')
const rspackBaseConfig = require('./rspack.base');

// @ts-ignore
module.exports = merge(rspackBaseConfig, {
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
