const path = require("path")
const rspack = require("@rspack/core")
const Dotenv = require("dotenv-webpack")

const deps = require("../package.json").dependencies
module.exports = {
	entry: {
		main: path.join(__dirname, "../src/index.tsx"),
	},
	output: {
		publicPath: "http://localhost:3003/",
	},
	mode: "development",
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
			patterns: [{ from: "manifest.json" }, { from: "./public/favicon.ico" }],
		}),
		new Dotenv({
			path: "./.env",
			safe: true,
		}),
		new rspack.HtmlRspackPlugin({
			template: "public/index.html",
			title: "Text-to-play engine that transforms imagination into playful apps.",
			filename: "index.html",
			chunks: ["main"],
		}),
		new rspack.container.ModuleFederationPlugin({
			name: "jigjoyui",
			filename: "remoteEntry.js",
			library: { type: "assign", name: "jigjoyui" },
			remotes: {},
			exposes: {
				"./Title": "./src/components/title",
				"./Heading": "./src/components/heading",
				"./Text": "./src/components/text",
				"./Audio": "./src/components/audio-button",
				"./Image": "./src/components/image",
				"./Video": "./src/components/video",
				"./CarouselTile": "./src/components/carousel-tile",
				"./PageTile": "./src/components/page-tile",
				"./Profile": "./src/components/profile",
				"./Question": "./src/components/question/question",
				"./Message": "./src/components/message",
				"./Button": "./src/components/button",
				"./Progress": "./src/components/progress",
				"./CloseIcon": "./src/icons/close-icon",
			},
			shared: {
				react: {
					singleton: true,
					requiredVersion: deps.react,
					eager: true,
				},
				"react-dom": {
					singleton: true,
					requiredVersion: deps["react-dom"],
					eager: true,
				},
			},
		}),
	],
	resolve: {
		extensions: [".jsx", ".tsx", ".ts", ".js", ".json"],
	},
}
