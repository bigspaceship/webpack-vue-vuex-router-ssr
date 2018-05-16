import Vue from 'vue';
import { sync } from 'vuex-router-sync';

import { createStore } from './store';
import { createRouter } from './router';
import App from './App.vue';

export function createApp() {
  const store = createStore();
  const router = createRouter();

  // sync the router with the Vuex store.
  // essentially creates store.state.route
  sync(store, router);

  /* eslint-disable no-new */
  const app = new Vue({
    router,
    store,
    render: h => h(App),
  });

  return { app, router, store };
}

