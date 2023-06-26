import axios from "axios";

const request = axios.create({
  baseURL:
    import.meta.env.VITE_MODE === "DEV"
      ? import.meta.env.VITE_DEV_URL
      : import.meta.env.VITE_PROD_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        delete request.defaults.headers.common["Authorization"];
      }
    }
    return Promise.reject(error);
  }
);

if (!request.defaults.headers.common["Authorization"]) {
  request.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
}

export default request;
