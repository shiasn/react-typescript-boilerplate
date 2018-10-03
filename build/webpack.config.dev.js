const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const config = require('../config').development;
const host = process.env.HOST;
const port = process.env.PORT && number(process.env.PORT);

const isMock = process.env.DATA_SOURCE === 'mock'

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.tsx'
  ],
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(ts|tsx)?$/,
        loader: 'tslint-loader',
        include: config.assetsRoot
      }
    ]
  },
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    compress: true,
    host: host || config.host,
    port: port || config.port,
    open: config.autoOpenBrowser,
    publicPath: config.assetsPublicPath,
    proxy: config.proxyTable,
    quiet: true,
    watchOptions: { poll: config.poll },
    before: isMock && require('../mock')
  },
  plugins: [
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html')
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['static/dll/vendor.dll.js'],
      append: false,
      hash: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
});