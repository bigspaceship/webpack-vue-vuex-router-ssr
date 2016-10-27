import Vue from 'vue';
import Router from 'vue-router';
import App from './App';
import store from './store';
import Home from './pages/Home';
import About from './pages/About';
import Wildcard from './pages/Wildcard';

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
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '*',
      name: 'wildcard',
      component: Wildcard,
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
