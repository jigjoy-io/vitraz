const path = require("path")
const { merge } = require("webpack-merge")
const rspackBaseConfig = require("./rspack.base")

const devConfig = {
	mode: "development",
	devtool: "eval",
	cache: false,
	optimization: {
		minimize: false,
	},
	devServer: {
		static: {
			directory: path.join(__dirname, "../dist"),
		},
		port: 3001,
		hot: true,
		compress: false,
		historyApiFallback: true,
		open: true,
	},
}

const mergedConfig = merge(rspackBaseConfig, devConfig)

module.exports = mergedConfig
