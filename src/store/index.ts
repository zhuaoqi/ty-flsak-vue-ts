import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const modulesFiles = require.context('./modules', true, /\.ts$/);

const modules: any = modulesFiles.keys().reduce((moduless: any, modulePath) => {
  const moduleName: any = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  moduless[moduleName] = value.default;
  return moduless;
}, {});

interface IMyClass {
  [name: string]: any;
}
const state: IMyClass = {};
const store = new Vuex.Store({
  state,
  mutations: {},
  actions: {},
  modules,
});

// store.registerModule('common', common);
export default store;
