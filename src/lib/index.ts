/**
 * Created by georgehupeijie on 2017/9/14.
 */
import request from '../api';

const install = (Vue: any) => {
  Vue.prototype.$request = request;
};

export default {
  install,
};
