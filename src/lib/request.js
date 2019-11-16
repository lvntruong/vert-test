import axios from 'axios';
import config from '../config';

export const request = (opts = {}, optsHeader = {}) => {
  const token = localStorage.getItem('access_token');
  const defaultOptions = {
    ...opts,
    headers: !token
      ? optsHeader
      : {
          ...optsHeader,
          Authorization: `Bearer ${token}`
        }
  };

  const axiosApi = axios.create({
    baseURL: config.app.API_URL,
    ...defaultOptions
  });

  return axiosApi;
};

export default request;
