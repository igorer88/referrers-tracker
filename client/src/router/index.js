import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import Login from '../views/Login';
import Signup from '../views/Signup';
import { ifAuthenticated } from './navigationGuards';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: {
      name: 'Login'
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: ifAuthenticated
  }
];

const router = new VueRouter({
  routes
});

export default router;
