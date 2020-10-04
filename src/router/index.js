import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Logs from '../views/Logs.vue'
import Notification from '../views/Notification.vue'
import store from '../store/index'
 
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requireAuthentication: true 
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requireAuthentication: false 
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: {
      requireAuthentication: false 
    }
  },
  {
    path: '/logs',
    name: 'Logs',
    component: Logs,
    meta: {
      requireAuthentication: true 
    }
  },
  {
    path: '/notification',
    name: 'Notification',
    component: Notification,
    meta: {
      requireAuthentication: true 
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(function(to, from, next){
  if (to.meta.requireAuthentication && !store.getters.isAuthenticated)
    next('/login');
  next();
});

export default router