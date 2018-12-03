import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from "axios";
import VueTouch from 'vue-touch';
Vue.use(VueTouch, {name: 'v-touch'});

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

import '@/assets/css/reset.css';
import '@/assets/js/rem.js';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
