// tslint:disable-next-line:no-reference
/// <reference path="moment.d.ts" />
import moment from 'moment';

export function dateformat(dataStr: string, pattern = 'YYYY-MM-DD') {
  if (!dataStr) {
    return '';
  }
  return moment(dataStr).format(pattern);
}
