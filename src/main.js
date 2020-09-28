import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Alert } from 'bootstrap';

var alertList = document.querySelectorAll('.alert');
alertList.forEach(function (alert) {
  new Alert(alert);
})

import './assets/app.scss';

Vue.config.productionTip = false

Vue.directive('date', {
  bind: function (el) {
    const date = new Date(el.innerText);
    el.innerText = date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0];
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')