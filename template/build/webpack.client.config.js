const webpack = require('webpack');
const merge = require('webpack-merge');
const SWPrecachePlugin = require('sw-precache-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const base = require('./webpack.base.config');
const config = require('../config');
const env = config.client.env;

const clientConfig = merge(base, {
  entry: {
    app: './src/entry-client.js',
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env': env,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module) {
        // a module is extracted into the vendor chunk if...
        return (
          // it's inside node_modules
          /node_modules/.test(module.context) &&
          // and not a CSS file (due to extract-text-webpack-plugin limitation)
          !/\.css$/.test(module.request)
        );
      },
    }),
    // extract webpack runtime and module manifest to avoid vendor chunk hash changing on every build
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),
    new VueSSRClientPlugin(),
  ],
});

if (env.NODE_ENV === 'production') {
  clientConfig.plugins.push(
    // auto generate service worker
    new SWPrecachePlugin({
      cacheId: 'big-spaceship-template',
      filename: 'service-worker.js',
      minify: true,
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePattersn: [/\.map$/, /\.json$/],
      runtimeCahing: [
        {
          urlPattern: '/',
          handler: 'networkFirst',
        },
        {
          urlPattern: '/about',
          handler: 'networkFirst',
        },
      ],
    })
  );
}

module.exports = clientConfig;
