import axios from "axios";
// import qs from "qs";
// import { getCookie } from "./cookie";
// 使用由库提供的配置的默认值来创建实例
// 此时超时配置的默认值是 `0`
// 覆写库的超时默认值
// 现在，在超时前，所有请求都会等待 2.5 秒

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 250000,
});
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // let token = getCookie("token");
    // config.headers["Authori-zation"] = "Bearer " + token;
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    if (response.data.status !== 200) {
      Message.error(response.data.msg);
    }
    return response.data;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

const get = (url, data) => {
  return new Promise((resolve, reject) => {
    instance
      .get(url, { params: data })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
const deleter = (url, data) => {
  return new Promise((resolve, reject) => {
    instance
      .delete(url, { params: data })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
const post = (url, data) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
const put = (url, data) => {
  return new Promise((resolve, reject) => {
    instance
      .put(url, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export { get, post, deleter, put };
