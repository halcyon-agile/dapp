import axios from "axios";

const customAxios = axios.create({
  baseURL: "https://lively-geyser-q53l27l9w5bc.vapor-farm-e1.com",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

export default customAxios;
