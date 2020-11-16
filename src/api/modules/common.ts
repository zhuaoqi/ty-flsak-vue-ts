import fetch from '@/lib/utils/request';

export default {
  getProductTypes: (data: any) => {
    return fetch({
      url: '/sql',
      data,
    });
  },
  imgBase64: (data: any) => {
    return fetch({
      url: '/imgBase64',
      data,
    });
  },
  userInfo: (data: any) => {
    return fetch({
      url: '/userInfo',
      data,
    });
  },
};
