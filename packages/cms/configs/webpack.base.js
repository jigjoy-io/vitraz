const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")
const Dotenv = require('dotenv-webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    entry: {
        main: path.join(__dirname, '../src/index.tsx'),
    },
    output: {
        publicPath: 'auto',
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                use: [
                    {
                        loader: "babel-loader"
                    }],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'  // Ensure postcss-loader is used for Tailwind
                ]
            }

        ],
    },

    plugins: [

        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),

        new CopyPlugin({
            patterns: [
                { from: "manifest.json" },
                { from: "./public/favicon.ico" }
            ],
        }),
        new Dotenv({
            path: './.env', // Path to .env file (this is the default)
            safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe)
        }),
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            title: 'JigJoy - Playground for Your Followers',
            filename: 'index.html',
            chunks: ['main'],
        }),
    ],
    resolve: {
        extensions: [".jsx", ".tsx", ".ts", ".js", ".json"],
    }
}
