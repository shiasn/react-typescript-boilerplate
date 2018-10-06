const path = require('path');
const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const config = require('../config');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const os = require('os');
const HappyPack = require("happypack");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

const styleLoaders = [
  "style-loader",
  {
    loader: "css-loader",
    options: {
      modules: true,
      localIdentName: "[local]_[hash:base64:5]"
    }
  },
  "postcss-loader"
]

module.exports = {
  context: resolve('/'),
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    publicPath: '/',
    chunkFilename: '[name]:[chunkhash:5].chunk.js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: ['happypack/loader?id=happyts'],
        include: resolve('src')
      },
      {
        test: /\.css$/,
        use: ['happypack/loader?id=happycss'],
        include: resolve('src')
      },
      {
        test: /\.less$/,
        use: ['happypack/loader?id=happyless'],
        include: resolve('src')
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join(config[env].assetsSubDirectory, 'fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join(config[env].assetsSubDirectory, 'images/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
    new HappyPack({
      id: 'happyts',
      threadPool: happyThreadPool,
      loaders: [
        env === 'development' && {
          loader: 'babel-loader',
          options: {
            plugins: [
              'react-hot-loader/babel'
            ]
          }
        },
        {
          path: 'ts-loader',
          query: {
            // transpileOnly: true,
            happyPackMode: true
          }
        }
      ].filter(Boolean),
    }),
    new HappyPack({
      id: 'happycss',
      threadPool: happyThreadPool,
      loaders: styleLoaders
    }),
    new HappyPack({
      id: 'happyless',
      threadPool: happyThreadPool,
      loaders: styleLoaders.concat(['less-loader'])
    }),
    new webpack.DllReferencePlugin({
      manifest: require('../dll/vendor-manifest.json'),
    }),
    new CopyWebpackPlugin([
      {
        from: resolve('static'),
        to: 'static'
      },
      {
        from: resolve('dll'),
        to: 'static/dll/'
      },
    ])
  ]
}