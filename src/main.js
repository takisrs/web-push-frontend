import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

import './assets/app.scss';

Vue.config.productionTip = false

Vue.directive('date', {
  bind: function (el) {
    const date = new Date(el.innerText);
    el.innerText = date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0];
  }
});

// Add the required rule
extend('required', {
  ...required,
  message: 'This field is required'
});

// Add the email rule
extend('email', {
  ...email,
  message: 'This field must be a valid email'
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')