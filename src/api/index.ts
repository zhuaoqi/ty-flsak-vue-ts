// TODO ******* */
const modulesFiles = require.context('./modules', true, /\.ts$/);
const modules: any = modulesFiles.keys().reduce((moduless: any, modulePath) => {
  const moduleName: any = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  moduless[moduleName] = value.default;
  return moduless;
}, {});

export default modules;
