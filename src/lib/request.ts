import axios from "axios"

declare module "axios" {
  export interface AxiosRequestConfig {
    retry?: number;
  }
}

const request = axios.create({
  baseURL: import.meta.env.VITE_MODE === "DEV" ? import.meta.env.VITE_DEV_URL : import.meta.env.VITE_PROD_URL,
  timeout: 50000,
  retry: 0,
})

request.interceptors.response.use(undefined, data => {
  if (data.response.config) {
    if (data.response.data) {
      if (data.response.status >= 200 && data.response.status < 500) {
        return Promise.resolve(data.response);
      }
    }
    if (data.response.retry < 2) {
      const config = {
        ...data.response.config,
        retry: data.response.retry + 1,
      }
      return request.request(config);
    }
  }

  return Promise.reject(data.response)
})

export default request;
