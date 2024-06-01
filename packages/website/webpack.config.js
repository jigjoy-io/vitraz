const path = require("path")
const HTMLPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const Dotenv = require('dotenv-webpack')

module.exports = {
    entry: {
        index: "./src/index.tsx"
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "babel-loader"
                    }],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    'css-loader',
                    'postcss-loader'
                ],
            },
            
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "manifest.json", to: "../manifest.json" },
                { from: "./public/favicon.ico" }
            ],
        }),
        new Dotenv({
            path: './.env', // Path to .env file (this is the default)
            safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe)
        }),
        ...getHtmlPlugins(["index"]),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
    },
}

function getHtmlPlugins(chunks) {
    return chunks.map(
        (chunk) =>
            new HTMLPlugin({
                title: "React, Webpack 5, Typescript, Babel, Tailwind start template",
                filename: `${chunk}.html`,
                chunks: [chunk],
            })
    )
}