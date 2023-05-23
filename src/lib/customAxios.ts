import axios from "axios";

const customAxios = axios.create({
  baseURL: "https://lively-geyser-q53l27l9w5bc.vapor-farm-e1.com",
});

export default customAxios;
