
import fetch from '@/lib/utils/request';

export default {
  imgCode: (data: any) => {
    return fetch({
      url: '/imgCode',
      responseType: 'blob',
      data,
    });
  },
  register: (data: any) => {
    return fetch({
      url: '/register',
      data,
    });
  },
};
