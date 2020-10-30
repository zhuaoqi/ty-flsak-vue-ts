const path: string = '/';
let domain: string = '';
const secure: string = '';

export default {
  _setDomain(d: any) {
    domain = d;
  },
  get(name: string) {
    const cookieName = encodeURIComponent(name) + '=';
    const cookieStart = document.cookie.indexOf(cookieName);
    let cookieValue = null;
    if (cookieStart > -1) {
      let cookieEnd = document.cookie.indexOf(';', cookieStart);
      if (cookieEnd === -1) {
        cookieEnd = document.cookie.length;
      }
      cookieValue = decodeURIComponent(
        document.cookie.substring(cookieStart + cookieName.length, cookieEnd),
      );
    }
    return cookieValue;
  },
  set(name: string, value: string, expires?: any) {
    let cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    if (expires instanceof Date) {
      cookieText += '; expires=' + expires;
    }
    if (path) {
      cookieText += '; path=' + path;
    }
    if (domain) {
      cookieText += '; domain=' + domain;
    }
    if (secure) {
      cookieText += '; secure';
    }
    document.cookie = cookieText;
  },
  remove(name: string) {
    this.set(name, '', new Date(0));
  },
  keys() {
    const aKeys = document.cookie
      .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '')
      .split(/\s*(?:\=[^;]*)?;\s*/);
    for (let nIdx = 0; nIdx < aKeys.length; nIdx++) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
    }
    return aKeys;
  },
  removeAll() {
    this.keys().forEach((key: any) => {
      this.remove(key);
    });
  },
};
