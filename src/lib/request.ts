import axios from "axios"
import { redirect } from "react-router-dom";

const request = axios.create({
  baseURL: import.meta.env.VITE_MODE === "DEV" ? import.meta.env.VITE_DEV_URL : import.meta.env.VITE_PROD_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

request.interceptors.response.use(undefined, data => {
  // console.log('data', data)
  if (data.response.config) {
    if (data.response.data) {
      if (data.response.status === 401 || data.response.status === 403) {
        delete request.defaults.headers.common["Authorization"];
        return redirect("/login")
      }
      if (data.response.status >= 200 && data.response.status < 500) {
        return Promise.resolve(data.response);
      }
    }
  }
  return Promise.reject(data.response)
})

if (!request.defaults.headers.common["Authorization"]) {
  request.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
}

export default request;
