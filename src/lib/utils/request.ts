/* global Promise */
import axios from 'axios';
import cookie from './cookie';
import router from '../../router';
import utils from './utils';
import { Message } from 'element-ui';
declare var window: any;

const DEFAULT_OPTIONS: any = {
  baseURL: '/api/v1.0',
  timeout: 1 * 60 * 1000,
  contentType: 'application/json; charset=UTF-8',
  method: 'POST',
};

const fetch = ({ data, ...options }: any) => {
  const TOKEN = cookie.get('access_token');

  axios.defaults.headers['auth-token'] = TOKEN;
  axios.defaults.headers.post['content-type'] = DEFAULT_OPTIONS.contentType;
  const axiosInstance: any = axios.create();
  axiosInstance.interceptors.request.use((config: any) => {
    return {
      ...config,
      ...DEFAULT_OPTIONS,
      ...options,
      data,
    };
  });
  return axiosInstance
    .request()
    .then((response: any) => {
      // 接口延迟时间
      window.__LAG_TIME__ =
        new Date().valueOf() -
        (new Date(response.headers.date).valueOf() || new Date().valueOf());
      if (response.data.code === undefined || response.data.code === 0) {
        return Promise.resolve(response.data);
      } else {
        Message(response.toString());
        return Promise.reject({ response });
      }
    })
    .catch((e: any) => {
       if (!e.response) {
        Message(e.toString());
        return Promise.reject(new Error(e));
      }
       const res = e.response;
       if (res.status === 401) {
        utils.clearCookies();
        router.push('/login');
        return Promise.reject(new Error('登录已超时，请重新登录。'));
      } else if (res.status === 403) {
        return Promise.reject(new Error('权限不足，请求被拒绝。'));
      } else if (res.status === 404) {
        return Promise.reject(new Error('未找到相应资源。'));
      } else if (res.status === 405) {
        Message(e.toString(), 'error');
        return Promise.reject(new Error('未找到相应资源。'));
      } else if (res.status === 426) {
        return Promise.reject(res.data);
      } else if (res.status === 500) {
        if (res.data) {
          return Promise.reject({
            ...res.data,
            message: res.data.msg,
          });
        }
        return Promise.reject(new Error('服务器异常。'));
      } else if (res.data) {
        return Promise.reject({
          ...res.data,
          message: res.data.msg,
        });
      }
       Message(JSON.stringify(e));
       return Promise.reject(e);
    });
};

export default fetch;
