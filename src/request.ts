import axios from 'axios';
import storage from 'node-persist';
import { authenticate } from './auth';

const request = axios.create({
  baseURL: 'https://api.vsinder.com',
  timeout: 30 * 1000,
  responseType: 'json',
  withCredentials: true
});

request.interceptors.request.use(async (config: any) => {
  const accessToken = await storage.get('accessToken');
  const refreshToken = await storage.get('refreshToken');
  if (accessToken && refreshToken) {
    config.headers['access-token'] = accessToken;
    config.headers['refresh-token'] = refreshToken;
  }
  return config;
});

request.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data);
  },
  async (error) => {
    if (error.response.status === 401) {
      const { accessToken, refreshToken } = await authenticate();
      await storage.set('accessToken', accessToken);
      await storage.set('refreshToken', refreshToken);
      return request(error.response.config);
    }
    throw error;
  }
);

export default request;
