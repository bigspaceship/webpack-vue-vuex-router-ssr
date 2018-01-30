import { application, store, router } from './app';

const isProduction = process.env.NODE_ENV === 'production';

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default context => {
  // set router's location
  router.push(context.url);

  let timestamp;
  if (!isProduction) {
    timestamp = Date.now();
  }

  return Promise.all(router.getMatchedComponents().map(component => {
    if (component.preFetch) {
      return component.preFetch(store);
    }

    return Promise.resolve();
  })).then(() => {
    if (!isProduction) {
      console.log(`Data fetch completed in ${Date.now() - timestamp}ms`);
    }

    context.initialState = store.state;
    return application;
  });
};
