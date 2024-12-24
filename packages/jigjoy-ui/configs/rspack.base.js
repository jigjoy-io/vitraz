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
			name: "jigjoy_ui",
			filename: "remoteEntry.js",
			remotes: {},
			library: {
				name: "jigjoy_ui",
				type: "assign",
			},
			exposes: {
				"./title": "./src/components/title",
				"./audio-button": "./src/components/audio-button",
				"./carousel-tile": "./src/components/carousel-tile",
				"./heading": "./src/components/heading",
				"./image": "./src/components/image",
				"./message": "./src/components/message",
				"./page-tile": "./src/components/page-tile",
				"./profile": "./src/components/profile",
				"./question": "./src/components/question/question",
				"./text": "./src/components/text",
				"./video": "./src/components/video",
				"./button": "./src/components/button",
				"./progress": "./src/components/progress",
				"./tabs": "./src/components/tabs/tabs",
				"./tab": "./src/components/tabs/tab",
				"./checkbox": "./src/components/checkbox",
				"./grid": "./src/components/grid",
				"./item": "./src/components/item",
				"./alert": "./src/components/alert",
				"./input": "./src/components/input",
				"./textarea": "./src/components/textarea",
				"./loader": "./src/components/loader/loader",
				"./tile": "./src/components/tile",
				"./jigjoy-logo": "./src/components/jigjoy-logo",
				"./util/click-outside-listener": "./src/util/click-outside-listener",
				"./icons/plus-icon": "./src/icons/plus-icon",
				"./icons/drag-handle-icon": "./src/icons/drag-handle-icon",
				"./icons/close-icon": "./src/icons/close-icon",
				"./icons/audio-icon": "./src/icons/audio-icon",
				"./icons/video-icon": "./src/icons/video-icon",
				"./icons/image-icon": "./src/icons/image-icon",
				"./icons/question-icon": "./src/icons/question-icon",
				"./icons/profile-icon": "./src/icons/profile-icon",
				"./icons/page-icon": "./src/icons/page-icon",
				"./icons/carousel-icon": "./src/icons/carousel-icon",
				"./icons/message-icon": "./src/icons/message-icon",
				"./icons/rename-icon": "./src/icons/rename-icon",
				"./icons/delete-icon": "./src/icons/delete-icon",
				"./icons/help-icon": "./src/icons/help-icon",
				"./icons/magic-icon": "./src/icons/magic-icon",
				"./icons/position-icon": "./src/icons/position-icon",
				"./icons/color-icon": "./src/icons/color-icon",
				"./icons/cta-icon": "./src/icons/cta-icon",
				"./icons/description-icon": "./src/icons/description-icon",
				"./icons/linkedin-icon": "./src/icons/linkedin-icon",
				"./icons/instagram-icon": "./src/icons/instagram-icon",
				"./icons/tiktok-icon": "./src/icons/tiktok-icon",
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
