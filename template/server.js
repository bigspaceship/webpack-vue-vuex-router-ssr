process.env.VUE_ENV = 'server'
const isProduction = process.env.NODE_ENV === 'production';

const fs = require('fs');
const path = require('path');
const resolve = file => path.resolve(__dirname, file);
const express = require('express');
const application = express();
const favicon = require('serve-favicon');
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer;
const serialize = require('serialize-javascript');
const opn = require('opn');

// splits index.html to head and tail
// head is index.html up to applicationHTML
// tail is index.html from applicationHTML to end of file
const indexHTML = (() => {
  const applicationHTML = '<div id="application"></div>';
  const template = fs.readFileSync(
    resolve((isProduction ? './dist/index.html' : './index.html')), 
    'utf-8');
  const index = template.indexOf(applicationHTML);

  return {
    head: template.slice(0, index),
    tail: template.slice(index + applicationHTML.length),
  }
})();

// create renderer with createBundleRenderer
// and a LRU cache of 15 mins with max capacity of 1000
function createRenderer (bundle) {
  return createBundleRenderer(bundle, {
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15,
    }),
  });
}

// production renderer works off of a pre-built bundle
// development renderer works off of a bundle that's being re-built on every change
// both bundles are built with webpack
let renderer;
if (isProduction) {
  renderer = createRenderer(fs.readFileSync(
    resolve('./dist/server-bundle.js'), 
    'utf-8'
  ));
} else {
  require('./build/dev-server')(application, bundle => {
    renderer = createRenderer(bundle);
  });
}

application.use(favicon(resolve('./static/favicon.ico')));
if(isProduction) {
  application.use('/static', express.static(resolve('./dist/static')));
}

// writes the head of index.html
// then injects the initial state of the application
// then writes the application as it's being rendered
// finally writes the tail of index.html
application.get('*', (request, response) => {
  if (!renderer) {
    return response.end('Compiling... Refresh in a moment!');
  }

  const timestamp = Date.now();
  let context = { url: request.originalUrl };
  const renderStream = renderer.renderToStream(context);
  let firstChunk = true;

  response.write(indexHTML.head);

  renderStream.on('data', chunk => {
    if(firstChunk) {
      // embed initial store state
      if(context.initialState) {
        response.write(
          `<script>
             window.INITIAL_STATE = ${serialize(context.initialState, { isJSON: true })};
           </script>`
        );
      }

      firstChunk = false;
    }

    response.write(chunk);
  });

  renderStream.on('end', () => {
    response.end(indexHTML.tail);
    console.log(`Request completed in ${Date.now() - timestamp}ms`);
  });

  renderStream.on('error', error => { throw error });
});

const port = process.env.PORT || 8080;
application.listen(port, () => {
  const uri = `http://localhost:${port}`;
  console.log(`Server started on ${uri}`);
  opn(uri);
});

