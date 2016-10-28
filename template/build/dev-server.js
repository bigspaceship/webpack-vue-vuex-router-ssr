require('./check-versions')()
const config = require('../config');
if (!process.env.NODE_ENV) process.env.NODE_ENV = config.dev.env
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const MFS = require('memory-fs');
const proxyMiddleware = require('http-proxy-middleware');
const serverWebpackConfig = require('./webpack.server.conf');

const clientWebpackConfig = (process.env.NODE_ENV === 'production'
  ? require('./webpack.client.prod.conf')
  : require('./webpack.client.dev.conf'));

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable;

// sets up development server
// compiles client-side application
// compiles server-side application and calls onUpdate as it compiles
module.exports = function setupDevServer (application, onUpdate) {
  const clientCompiler = webpack(clientWebpackConfig);

  const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
    publicPath: clientWebpackConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  });

  const hotMiddleware = require('webpack-hot-middleware')(clientCompiler);
  // force page reload when html-webpack-plugin template changes
  clientCompiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
      hotMiddleware.publish({ action: 'reload' });
      cb();
    });
  });

  // proxy api requests
  Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context];
    if (typeof options === 'string') {
      options = { target: options };
    }
    application.use(proxyMiddleware(context, options));
  })

  // handle fallback for HTML5 history API
  application.use(require('connect-history-api-fallback')());

  // serve webpack bundle output
  application.use(devMiddleware);

  // enable hot-reload and state-preserving
  // compilation error display
  application.use(hotMiddleware);

  // serve pure static assets
  const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
  application.use(staticPath, express.static('./static'));

  // watch and update server renderer
  const serverCompiler = webpack(serverWebpackConfig);
  const mfs = new MFS();
  const outputPath = path.join(serverWebpackConfig.output.path, serverWebpackConfig.output.filename);
  serverCompiler.outputFileSystem = mfs;
  serverCompiler.watch({}, (error, stats) => {
    if (error) throw error;
    stats = stats.toJson();
    stats.errors.forEach(error => console.error(error));
    stats.warnings.forEach(warning => console.warn(warning));
    onUpdate(mfs.readFileSync(outputPath, 'utf-8'));
  })
}
