/*************************/
import store from '../../store';

const login: any[] = [
  {
    path: '/login',
    name: 'login',
    meta: {
      needNotToken: true,
    },
    beforeEnter: (to: any, from: any, next: any) => {
      store.commit('common/setAsideMenuTree', { subMenus: [] });
      next();
    },
    component: () => import('@/views/login/login.vue'),
  },
];

export default login;
