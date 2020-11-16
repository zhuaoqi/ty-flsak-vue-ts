import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import utils from '../lib/utils/utils';
import cookie from '../lib/utils/cookie';
import store from '../store';
import common from './modules/common';
import login from './modules/login';

Vue.use(VueRouter);

const routes: RouteConfig[] = [...common, ...login];

const router = new VueRouter({
  mode: 'hash',
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});


router.beforeEach((to, from, next) => {
  const token = cookie.get('access_token');
  if (!token && !to.meta.needNotToken) {
    utils.clearCookies();
    router.push('/login');
  } else if (to.meta.needNotToken && to.matched.length > 0) {
    next();
  } else if (to.matched.length > 0) {
    // 如果cookie中的token有效但尚未获取过用户信息，获取一次用户信息后再次根据条件跳转相应模块
    const userInfo = store.state.common.userInfo;
    if (!userInfo.username) {
      utils.setUserInfo();
    }
    next();
  }

});


export default router;
