// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');

module.exports = {
  build: {
    env: require('./prod.env'),
  },
  client: {
    env: require('./client.env'),
  },
  server: {
    env: require('./server.env'),
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    proxyTable: {},
  },
};
