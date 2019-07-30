import http from 'lz-request/lib/http';

import { getItem } from '.';

interface CustomWindow extends Window {
  biConfig: any;
}
declare let window: CustomWindow;
//bi 演示
// http.setDefaultBaseURL('http://kingofdinner.realsun.me:8102/');
//powerworks 演示
//http.setDefaultBaseURL('http://kingofdinner.realsun.me:5051/');
//finisar 项目内网
http.setDefaultBaseURL('http://10.108.2.66:1001/');
// 请求拦截
http.setRequestInterceptors(
  function(config) {
    // 请求头加上 token
    const userInfo = JSON.parse(getItem('userInfo'));

    let token = userInfo && userInfo.AccessToken;
    let userCode = userInfo && userInfo.UserCode;
    if (token && userCode) {
      config.headers.accessToken = token;
      config.headers.userCode = userCode;
    }
    return config;
  },
  function(error) {
    return error;
  }
);

// 响应拦截
http.setResponseInterceptors(
  function(response) {
    const res = response.data;
    if (
      (res &&
        (res.error === 0 ||
          res.error === '0' ||
          res.Error === 0 ||
          res.Error === '0' ||
          res.OpResult === 'Y')) ||
      res === 'ok'
    ) {
      return res;
    } else {
      throw new Error(res.ErrMsg || res.message || res.ErrorMsg);
    }
  },
  function(error) {
    return error;
  }
);

/**
 * 使 this.setState() 在异步请求中可以取消调用：https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
 * @param {promise} promise 请求对象
 */
export const makeCancelable = promise => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => (hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)),
      error => (hasCanceled_ ? reject({ isCanceled: true }) : reject(error))
    );
  });
  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    }
  };
};

/**
 * 获取字段聚合后的值
 * 参数：{ resid, fields, groupby, cmswhere, orderby, dblink, innStart, intMaxRecords, strTableName, getresourcedata }
 * 1. resid：资源id
 * 2. fields：需要聚合的字段
 * 3. groupby：group by 字段
 * 4. cmswhere：where 语句
 * 5. orderby：排序
 * 6. ...
 */
http.createApi('getFieldAggregateValue', {
  method: 'get',
  url: '/api/100/table/GetDataBySqlParts'
});

export default http;
