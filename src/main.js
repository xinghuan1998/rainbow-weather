import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'qweather-icons/font/qweather-icons.css';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(ElementUI);

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
