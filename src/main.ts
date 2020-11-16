import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import api from '@/api/index';
import lib from './lib';
import './assets/css/index.scss';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI, { size: 'small' });


Vue.config.productionTip = false;
Vue.use(api);
Vue.use(lib);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
