import axios from 'axios';

const config = {
  baseURL: `https://htmlacademy-react-3.appspot.com/six-cities`,
  timeout: 5000,
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
