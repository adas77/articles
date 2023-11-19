import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

export const BASE_URL = '/api/';
function createAxios() {
  const headers: Record<string, string> = {};
  const mocked_token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjaGFuZ2VfbWUiLCJpYXQiOjE3MDAyNDM3NTAsImV4cCI6ODY1NzAwMTU3MzUwLjAsInN1YiI6eyJ1c2VyX2lkIjoxfX0.u5Ugm2zCRcJ-3typLDfPouewZPrHSWhtFm8tR8-BcU0';
  headers['Content-Type'] = 'application/json';
  headers['Access-Control-Allow-Origin'] = '*';
  headers['Authorization'] = `Bearer ${mocked_token}`;

  return axios.create({
    baseURL: BASE_URL,
    timeout: 60 * 1000, // 60 seconds
    headers: headers,
  });
}

export const api = createAxios();

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

// export { api };
