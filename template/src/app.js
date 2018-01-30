import Vue from 'vue';
import Router from 'vue-router';
import { sync } from 'vuex-router-sync';

import App from './App.vue';
import { createStore } from './store';

export function createApp() {
  const store = createStore();

  // route-level code splitting
  const Home = () => import ('./pages/Home.vue');
  const About = () => import ('./pages/About.vue');
  const Wildcard = () => import ('./pages/Wildcard.vue');

  Vue.use(Router);

  const router = new Router({
    mode: 'history',
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home,
      }, {
        path: '/about',
        name: 'about',
        component: About,
      }, {
        path: '*',
        name: 'wildcard',
        component: Wildcard,
      },
    ],
  });

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

