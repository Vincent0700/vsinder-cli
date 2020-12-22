import axios from 'axios';
import * as storage from 'node-persist';

const request = axios.create({
  baseURL: 'https://api.vsinder.com',
  timeout: 30 * 1000,
  responseType: 'json',
  withCredentials: true
});

request.interceptors.request.use(async (config: any) => {
  await storage.init({
    dir: './cache',
    parse: JSON.parse,
    encoding: 'utf8',
    logging: false,
    expiredInterval: 86400000,
    forgiveParseErrors: true
  });
  await storage.set('accessToken', '123');
  await storage.set('refreshToken', '456');
  const accessToken = await storage.get('accessToken');
  const refreshToken = await storage.get('refreshToken');
  console.log(accessToken, refreshToken);
  config.headers['accessToken'] = accessToken;
  config.headers['refreshToken'] = refreshToken;
  return config;
});

request.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    // if (error.response.status === 401) {
    // }
    return Promise.reject(error.response);
  }
);

export default request;
