import axios from 'axios';
import {BASE_URL, TIME_OUT} from './const/const.js';

const config = {
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  withCredentials: true
};

export const createAPI = (onFail) => {
  const api = axios.create(config);

  const onSuccess = (response) => response;
  const onError = (err) => {
    if (err.response) {
      onFail(err.response, err.response.status);
    } else if (err.request) {
      onFail(err.request, null);
    } else {
      onFail(err.message, null);
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onError);

  return api;
};
