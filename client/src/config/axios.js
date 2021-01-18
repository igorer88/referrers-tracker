import axios from 'axios';
const host = process.env.VUE_APP_API_HOST;
const port = process.env.VUE_APP_API_PORT;

const instance = axios.create({
  baseURL: `http://${host}:${port}/api/`
});

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access-token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

instance.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

export default instance;
