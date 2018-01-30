const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

let webpackConfig = merge(baseWebpackConfig, {
  target: 'node',
  devtool: false,
  entry: './src/server-main.js',
  output: Object.assign({}, baseWebpackConfig.output, {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  }),
  externals: Object.keys(require('../package.json').dependencies),
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/server.env'),
    })
  ]
});

module.exports = webpackConfig;
