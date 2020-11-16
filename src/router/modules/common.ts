/******* common ********/
import Home from '@/views/Home.vue';

const common = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
  {
    path: '/cet4',
    name: 'Cet4Js',
    component: () => import('@/views/cet4Js/cet4.vue'),
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test/index.vue'),
  },
  {
    path: '/live2d',
    name: 'live2d',
    meta: {
      fullScreen: true,
    },
    component: () => import('@/views/live2d/live2d.vue'),
  },
  {
    path: '/rotateImg',
    name: 'rotateImg',
    component: () => import('@/views/rotateImg/rotateImg.vue'),
  },
];

export default common;
