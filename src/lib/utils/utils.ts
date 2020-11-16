import CryptoJS from 'crypto-js';
import cookie from './cookie';
import request from '../../api';
import store from '../../store';
import JQ from 'jquery';

export default {
  encryptUtil: (data: any) => {
    const key = CryptoJS.enc.Utf8.parse('12345678abcdefgh');
    const crypKey = CryptoJS.enc.Utf8.parse('1234567890123456');
    const iv = crypKey;
    const encrypted = CryptoJS.AES.encrypt(data, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding,
    });

    return encrypted.toString();
  },
  // 根据token获取并设置当前登录账号基本信息
  setUserInfo: () => {
    // 获取 公司 页面模板 配置
    return request.common.userInfo().then((res: any) => {
      store.commit('common/setUserInfo', res.data);
      return Promise.resolve(res);
    });
  },

  clearCookies() {
    cookie.remove('access_token');
    cookie.remove('token_type');
    cookie.remove('source');
  },
  // 删除对象中的空字符串
  clearNullKeys(obj: any) {
    Object.keys(obj).forEach((item) => {
      if (!obj[item]) {
        delete obj[item];
      }
    });
    return obj;
  },
  // 时间戳格式化函数
};
