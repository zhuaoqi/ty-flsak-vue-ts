
const state = {
    aaa: 666,
    asideMenuTree: [],
    userInfo: {},
  };

const mutations = {
  setAsideMenuTree(states: any, menuTree: any) {
    states.asideMenuTree = menuTree;
  },
  setUserInfo(states: any, data: any) {
    states.userInfo = data;
  },
};

const actions = {};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};
