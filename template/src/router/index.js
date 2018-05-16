import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// route-level code splitting
const Home = () => import('../pages/Home.vue');
const About = () => import('../pages/About.vue');
const Wildcard = () => import('../pages/Wildcard.vue');

export function createRouter() {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({ x: 0, y: 0 }),
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
}
