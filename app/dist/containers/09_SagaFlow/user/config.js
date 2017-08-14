/* @flow */
import { STORE_KEY } from './constant';
import Reducer from './reducer';
import Saga from './saga';

export default {
  reducer: {
    [STORE_KEY]: Reducer
  },
  saga: Saga
};

/**
 * 將 saga 檔案寫入 sagas 參數，即可綁定監聽的 API 回傳行為
 * 若需綁定多筆 sagas 可使用陣列格式
 * 
 * ex.
 * saga: [SagaA, SagaB]
 * 
 */
