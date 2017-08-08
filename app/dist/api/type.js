/* @flow */
export type MethodEnum = 'get' | 'post' | 'put' | 'delete';

export type RequestType = {
  [code: string]: (
    ...args: Array<any>
  ) => {
    method: MethodEnum,
    url: string,
    body?: any
  }
};
