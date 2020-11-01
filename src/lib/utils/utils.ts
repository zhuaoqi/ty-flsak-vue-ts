import CryptoJS from 'crypto-js';
import cookie from './cookie';
import request from '../../api';
import store from '../../store';
import JQ from 'jquery';
declare var window: any;
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
  setUserInfo: (companyInfo: any) => {
    if (companyInfo) {
      const currentPlatId = store.state.login.userInfo.currentPlatId || '';
      const currentCompanyCode = companyInfo.currentCompanyCode || '';
      const currentCompanyType = companyInfo.currentCompanyType || '';
      cookie.set(
        'source',
        ['pc', currentPlatId, currentCompanyCode, currentCompanyType].join(
          '<>',
        ),
        '',
      );
    }
    const platConfig = store.state.common.platConfig;
    // 获取全平台配置
    if (!platConfig) {
      request.plat.getAllConfig().then((res: any) => {
        store.commit('common/changPlatConfig', res.data);
      });
    }

    // 获取 公司 页面模板 配置
    request.plat.sysPageTemplate().then((res: any) => {
      store.commit('common/changSysPageTemplate', res.data);
    });

    return request.common.getInfo().then((res: any) => {
      const currentPlatId = res.data.currentPlatId || '';
      const currentCompanyCode = res.data.currentCompanyCode || '';
      const defalutCompanyType = res.data.defalutCompanyType || '';
      if (!cookie.get('source')) {
        cookie.set(
          'source',
          ['pc', currentPlatId, currentCompanyCode, defalutCompanyType].join(
            '<>',
          ),
        );
        // cookie.set('companyName', res.data.currentCompanyName)
      }
      cookie.set('companyName', res.data.currentCompanyName);
      store.commit('login/setInfo', res.data);
      return Promise.resolve(res.data);
    });
  },
  // 当前账号切换公司
  changeUserInfo: (companyInfo: any) => {
    if (companyInfo) {
      const currentPlatId = store.state.login.userInfo.currentPlatId || '';
      const currentCompanyCode = companyInfo.companyCode || '';
      const currentCompanyType = companyInfo.defaultCompanyType || '';
      cookie.set(
        'source',
        ['pc', currentPlatId, currentCompanyCode, currentCompanyType].join('<>'),
      );
    }
    return request.common.getInfo().then((res: any) => {
      console.log(res.data.currentCompanyName);
      const currentPlatId = res.data.currentPlatId || '';
      const currentCompanyCode = res.data.currentCompanyCode || '';
      const currentCompanyType = res.data.currentCompanyType || '';
      // const currentCompanyType = '111' || ''
      // if(_this.$route.path == '/plat/platCommissionList'){

      // }else{}
      cookie.set(
        'source',
        ['pc', currentPlatId, currentCompanyCode, currentCompanyType].join('<>'),
      );
      cookie.set('companyName', res.data.currentCompanyName);
      store.commit('login/setInfo', res.data);
      return Promise.resolve(res.data);
    });
  },

  clearCookies() {
    cookie.remove('access_token');
    cookie.remove('token_type');
    cookie.remove('source');
  },
  countDown(endTime: any, update: any, end: any, timer: any, num: any) {
    // let requestAnimationFrame =
    //   window.requestAnimationFrame ||
    //   function (fn) {
    //     setTimeout(fn, 17)
    //   }
    // tslint:disable-next-line:only-arrow-functions
    const requestAnimationFrame = function(fn: any) {
      // console.log(this)
      clearTimeout(timer[num]);
      timer[num] = setTimeout(fn, 120);
      // console.log(timer)
    };

    function animate() {
      const leftTimeStamp =
        endTime - (new Date().valueOf() - window.__LAG_TIME__);
      if (leftTimeStamp > 0) {
        const day = Math.floor(leftTimeStamp / (24 * 60 * 60 * 1000));
        let hour: any = Math.floor((leftTimeStamp / (60 * 60 * 1000)) % 24);
        const min = Math.floor((leftTimeStamp / (60 * 1000)) % 60);
        const sec = Math.floor((leftTimeStamp / 1000) % 60);
        const leftTime: any = {
          min: min < 10 ? '0' + min : min,
          sec: sec < 10 ? '0' + sec : sec,
        };
        if (hour > 0 || day > 0) {
          hour = hour < 10 ? '0' + hour : hour;
          leftTime.hour = hour;
        }
        if (day > 0) {
          leftTime.day = day;
        }
        update(leftTime, leftTimeStamp);
        requestAnimationFrame(animate);
      } else {
        end();
      }
    }

    animate();
  },
  listSetmiuout(endTime: any, update: any, end: any) {
    const leftTimeStamp =
      endTime - (new Date().valueOf() - window.__LAG_TIME__);
    if (leftTimeStamp > 0) {
      const day = Math.floor(leftTimeStamp / (24 * 60 * 60 * 1000));
      let hour: any = Math.floor((leftTimeStamp / (60 * 60 * 1000)) % 24);
      const min = Math.floor((leftTimeStamp / (60 * 1000)) % 60);
      const sec = Math.floor((leftTimeStamp / 1000) % 60);
      const leftTime: any = {
        min: min < 10 ? '0' + min : min,
        sec: sec < 10 ? '0' + sec : sec,
      };
      if (hour > 0 || day > 0) {
        hour = hour < 10 ? '0' + hour : hour;
        leftTime.hour = hour;
      }
      if (day > 0) {
        leftTime.day = day;
      }
      update(leftTime, leftTimeStamp);
    } else {
      end();
    }
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
