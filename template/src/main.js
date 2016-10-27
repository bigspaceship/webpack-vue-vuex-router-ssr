{{#if_eq build "runtime"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue';
import Router from 'vue-router';
import App from './App';
import store from './store';
import Home from './pages/Home';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
  ],
});

/* eslint-disable no-new */

const app = new Vue({
  el: '#app',
  router,
  store,
  ...App,
});

export { app, router };
