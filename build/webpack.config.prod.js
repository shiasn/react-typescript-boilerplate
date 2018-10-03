const path = require('path');
const webpack = require('webpack');
const config = require('../config').production;
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

function assetsPath(_path) {
  return path.posix.join(config.assetsSubDirectory, _path);
}

const seen = new Set();
const nameLength = 4;

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: config.devtool,
  entry: [
    'babel-polyfill',
    './src/index.tsx'
  ],
  output: {
    path: config.assetsRoot,
    filename: assetsPath('js/[name].[chunkhash:8].js'),
    chunkFilename: assetsPath('js/[name].[chunkhash:8].js')
  },
  plugins: [
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(false)
    }),
    new MiniCssExtractPlugin({
      filename: assetsPath('css/[name].[contenthash:8].css'),
      chunkFilename: assetsPath('css/[name].[contenthash:8].css')
    }),
    new HtmlWebpackPlugin({
      filename: config.index,
      template: path.resolve(__dirname, '../src/index.html'),
      inject: true,
      title: 'Console',
      path: config.assetsPublicPath + config.assetsSubDirectory,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['dll/vendor.dll.js'],
      append: false,
      hash: true
    }),
    new ScriptExtHtmlWebpackPlugin({
      inline: /runtime\..*\.js$/
    }),
    new webpack.NamedChunksPlugin(chunk => {
      if (chunk.name) return chunk.name;

      const modules = Array.from(chunk.modulesIterable);
      if (modules.length > 1) {
        const hash = require('hash-sum');
        const joinedHash = hash(modules.map(m => m.id).join('_'));
        let len = nameLength;
        while (seen.has(joinedHash.substr(0, len))) len++;
        seen.add(joinedHash.substr(0, len));
        return `chunk-${joinedHash.substr(0, len)}`;
      } else {
        return modules[0].id;
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new CopyWebpackPlugin([
      {
        from: resolve('static'),
        to: config.assetsSubDirectory
      }
    ]),
    new BundleAnalyzerPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial'
        },
        commons: {
          name: "chunk-comomns",
          test: resolve("src/components"),
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: 'single',
    minimizer: [
      new ParallelUglifyPlugin({
        cacheDir: resolve('uglify-cache'),
        uglifyJS: {
          output: {
            beautify: false,
            comments: false
          },
          compress: {
            warnings: false,
            drop_console: true,
            collapse_vars: true,
            reduce_vars: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  }
})