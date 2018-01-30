import { createApp } from './app';

const isDev = process.env.NODE_ENV !== 'production';

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default context => {
  return new Promise((resolve, reject) => {
    const s = isDev && Date.now();
    const { app, router, store } = createApp();
    const meta = app.$meta();

    // set router's location
    router.push(context.url);
    context.meta = meta;

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      // no matched routes
      if (!matchedComponents.length) {
        reject({ code: 404 });
      }
      // Call fetchData hooks on components matched by the route.
      // A preFetch hook dispatches a store action and returns a Promise,
      // which is resolved when the action is complete and store state has been
      // updated.
      Promise.all(
        matchedComponents.map(components => {
          return (
            component.asyncData &&
            component.asyncData({
              store,
              route: router.currentRoute,
            })
          );
        })
      )
        .then(() => {
          if (!isDev) {
            // eslint-disable-next-line
            console.log(`data pre-fetch: ${Date.now() - s}ms`);
          }
          context.state = store.state;
          resolve(app);
        })
        .catch(reject);
    }, reject);
  });
};
