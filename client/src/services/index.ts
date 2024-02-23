import axios from "axios";
import { cookies } from "next/dist/client/components/headers";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: { Accept: "application/json" },
  xsrfCookieName: 'CSRF-TOKEN',
  xsrfHeaderName: 'X-CSRF-Token',
  withCredentials: true,
});

api.interceptors.request.use(
  function (config) {
    config.params = { ...config.params };
    // config.headers['X-CSRF-Token'] = getCookie('CSRF-TOKEN');
    config.withCredentials = true;

    return config;
  },
  function (error) {
    if (error.response.status === 401) {
      window.location.href = process.env.NEXT_PUBLIC_API_URL || "/";
    }

    return Promise.reject(error);
  }
);

export { api };
