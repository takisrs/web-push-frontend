import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import Logs from '../views/Logs.vue';
import Notifications from '../views/Notifications.vue';
import Notification from '../views/Notification.vue';
import Documentation from '../views/Documentation.vue';
import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requireAuthentication: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requireAuthentication: false,
    },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: {
      requireAuthentication: false,
    },
  },
  {
    path: '/logs',
    name: 'Logs',
    component: Logs,
    meta: {
      requireAuthentication: true,
    },
  },
  {
    path: '/documentation',
    name: 'Documentation',
    component: Documentation,
    meta: {
      requireAuthentication: true,
    },
  },
  {
    path: '/notifications/:page?',
    name: 'Notifications',
    component: Notifications,
    meta: {
      requireAuthentication: true,
    },
  },
  {
    path: '/notification/create',
    name: 'NotificationCreate',
    component: Notification,
    meta: {
      requireAuthentication: true,
    },
  },
  {
    path: '/notification/edit/:id',
    name: 'NotificationEdit',
    component: Notification,
    meta: {
      requireAuthentication: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach(function (to, from, next) {
  store.dispatch('checkAutoLogin').then(() => {
    if (to.meta.requireAuthentication && !store.getters.isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  });
});

export default router;
