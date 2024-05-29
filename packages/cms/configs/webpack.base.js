const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
const { ModuleFederationPlugin } = webpack.container
const { FederatedTypesPlugin } = require('@module-federation/typescript')
const federationConfig = require('./federationConfig')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const initModuleFederationConfig = federationConfig({
  ui: 'http://localhost:3000'
})

module.exports = {
  entry: {
    main: path.join(__dirname, '../src/index.js'),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-typescript',
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3,
                },
              ],
              '@babel/preset-react',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ],
      }

    ],
  },
  output: {
    publicPath: 'auto',
  },
  target: 'web',

  plugins: [

    // new ModuleFederationPlugin(initModuleFederationConfig),

    // new FederatedTypesPlugin({
    //   federationConfig: initModuleFederationConfig,
    // }),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),

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
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      title: 'CMS App',
      filename: 'index.html',
      chunks: ['main'],
    }),
  ],
  resolve: {
    extensions: [".jsx", ".tsx", ".ts", ".js", ".json"],
  }
}
