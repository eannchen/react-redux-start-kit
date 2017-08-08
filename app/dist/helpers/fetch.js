/* @flow */
import apiSet from '~/api/request';
import { API_URL } from 'Config';
import { SAGA_ACTION } from './saga-flow/constant';
import type { SagaAction } from './saga-flow/type';

export function _validate(api: string, ...args: Array<any>): void {
  if (!apiSet[api]) throw '找不到指定的 api :' + api;
  if (typeof apiSet[api] !== 'function') throw 'api 參數宣告必須為方法 :' + api;
  const apiObject = apiSet[api](...args);
  if (!('method' in apiObject)) throw '缺少 method 參數：' + api;
  if (!('url' in apiObject)) throw '缺少 url 參數：' + api;
  if (!['get', 'post', 'put', 'delete'].includes(apiObject['method']))
    throw 'method 格式錯誤' + api;
}

export function fetchApi(api: string, ...args: Array<any>): SagaAction {
  /* 錯誤檢查 */
  _validate(api, ...args);
  /* fetch */
  const { method, url, body = null } = apiSet[api](...args);
  return {
    type: SAGA_ACTION,
    payload: {
      api,
      stream: fetch(API_URL + url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        method,
        body
      })
    }
  };
}
