import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// 定义响应数据结构（根据后端实际返回调整）
export interface ResponseData<T = any> {
  code: number;
  message: string;
  data: T;
}

// 创建 axios 实例
const service = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    const { code, message } = response.data;
    if (code !== 200) {
      console.error(`请求错误: ${message}`);
      return Promise.reject(new Error(message || '接口请求失败'));
    }
    return response.data;
  },
  (error: AxiosError) => {
    let errorMessage = '未知错误';
    if (error.message.includes('timeout')) {
      errorMessage = '请求超时，请稍后再试';
    } else if (axios.isCancel(error)) {
      errorMessage = '请求已取消';
    } else if (error.response) {
      const status = error.response.status;
      errorMessage = `请求失败，状态码: ${status}`;
      if (status === 401) {
        console.error('未授权，请重新登录');
      }
    } else if (error.request) {
      errorMessage = '无法连接到服务器，请检查网络';
    }
    console.error(errorMessage);
    return Promise.reject({ message: errorMessage });
  }
);

// 封装请求方法
const request = <T = any>(config: AxiosRequestConfig): Promise<ResponseData<T>> => {
  return service(config);
};

export default request;
