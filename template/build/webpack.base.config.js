const path = require('path');
const webpack = require('webpack');
const vueConfig = require('./vue-loader.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const config = require('../config');
const utils = require('./utils');

const isProd = process.env.NODE_ENV === 'production';

// check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// various preprocessor loaders added to vue-loader at the end of this file
const cssSourceMapDev = (!isProd && config.dev.cssSourceMap);
const cssSourceMapProd = (isProd && config.build.productionSourceMap);
const useCssSourceMap = cssSourceMapDev || cssSourceMapProd;

module.exports = {
  devtool: isProd ? false : '#cheap-module-source-map', 
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'components': path.resolve(__dirname, '../src/components'),
      'public': path.resolve(__dirname, '../public')
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue',
        options: vueConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        use: isProd
          ? ExtractTextPluginn.extract({
            use: 'css-loader?minimize',
            fallback: 'vue-style-loader'
          })
        : ['vue-style-loader', 'css-loader']
      },
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false,
  },
  plugins: isProd
    ? [
        new webpack.optimize.UglifyJsPluginn({
          compress: { warnings: false },
        }),
        new ExtractTextPlugin({
          filename: 'common.[chunkhash].css',
        }),
    ]
  : [new FriendlyErrosPlugin()],
};
