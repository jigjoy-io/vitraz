const path = require("path")
const rspack = require("@rspack/core")
const Dotenv = require("dotenv-webpack")

module.exports = {
	entry: {
		main: path.join(__dirname, "../src/index.tsx"),
	},
	output: {
		publicPath: "auto",
	},
	target: "web",
	module: {
		rules: [
			{
				test: /\.(ts|tsx|js|jsx)$/,
				use: {
					loader: "builtin:swc-loader",
					options: {
						sourceMap: true,
						jsc: {
							parser: {
								syntax: "typescript",
								tsx: true,
							},
							transform: {
								react: {
									runtime: "automatic",
								},
							},
						},
					},
				},
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: [rspack.CssExtractRspackPlugin.loader, "css-loader", "postcss-loader"],
			},
		],
	},
	plugins: [
		new rspack.CssExtractRspackPlugin({
			filename: "[name].[contenthash].css",
		}),
		new rspack.CopyRspackPlugin({
			patterns: [
				{ from: "manifest.json" },
				{ from: "./public/favicon.ico" },
				{ from: "./public/audio", to: "public/audio" },
				{ from: "./public/images", to: "public/images" },
			],
		}),
		new Dotenv({
			path: "./.env",
			safe: true,
		}),
		new rspack.HtmlRspackPlugin({
			template: "public/index.html",
			title: "JigJoy - The no-code platform for gamified content creation.",
			filename: "index.html",
			chunks: ["main"],
		}),
	],
	resolve: {
		extensions: [".jsx", ".tsx", ".ts", ".js", ".json"],
	},
}
