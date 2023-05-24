import axios from "axios";

const customAxios = axios.create({
  baseURL: "http://halcyon-pms-web.test",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

export default customAxios;
