// https://github.com/shelljs/shelljs
require('./check-versions')()

process.env.NODE_ENV = 'production';

const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config');
const clientConfig = require('./webpack.client.config');
const serverConfig = require('./webpack.server.config');

const spinner = ora('building for production...');
spinner.start();

rm (config.build.path, err => {
  if (err) throw err;

  function build(err, state) {
  };

  webpack([clientConfig, serverConfig], (err, stats) => {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: true,
      chunks: false,
      chunkModules: false,
    }) + '\n\n');

    if (stats.hasErrors()) {
      console.log(chalk.red(' Build failed with errors.\n'));
      process.exit(1);
    }

    console.log(chalk.cyan(' Build complete.\n'));
  });
});
