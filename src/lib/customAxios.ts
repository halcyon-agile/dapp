import axios from "axios";

const customAxios = axios.create({
  baseURL:
    import.meta.env.VITE_MODE === "DEV"
      ? import.meta.env.VITE_DEV_URL
      : import.meta.env.VITE_PROD_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

if (!customAxios.defaults.headers.common["Authorization"]) {
  customAxios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
}

export default customAxios;
