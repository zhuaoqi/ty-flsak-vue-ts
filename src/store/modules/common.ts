import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    aaa: 666,
    asideMenuTree: [],
  },
  mutations: {
    setAsideMenuTree(state, menuTree) {
      state.asideMenuTree = menuTree;
    },
  },
  actions: {},
});
