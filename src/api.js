import axios from 'axios';

const config = {
  baseURL: `https://htmlacademy-react-3.appspot.com/six-cities`,
  timeout: 5000,
  withCredentials: true
};

const UNAUTHORIZED = 401;

export const createAPI = (onUnauthorized) => {
  const api = axios.create(config);

  const onSuccess = (response) => response;
  const onError = (err) => {
    if (err.response.status === UNAUTHORIZED) {
      onUnauthorized();
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onError);

  return api;
};
