const path = require('path');

module.exports = {
  development: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    assetsRoot: path.resolve(__dirname, '../dist'),
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: false,
    poll: false,
    cssSourceMap: false,
    devtool: 'cheap-module-eval-source-map',
    proxyTable: {},
    host: 'localhost',
    port: 8080,
  },
  production: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    devtool: 'source-map',
  }
}