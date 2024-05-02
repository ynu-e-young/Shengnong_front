import axios from "axios";
import { useCookies } from "vue3-cookies";

const {cookies} = useCookies();

const API = axios.create({
  // baseURL: "http://localhost:8090/",
  baseURL: "http://boer.ink:5004/",
  timeout: 15000,
});

API.interceptors.request.use(
  (config) => {
    if (!config.url.startsWith("/user/login") && !config.url.startsWith("/user/register"))
      try {
        config.headers["Authorization"] = "Bearer " + cookies.get("token");
      } catch (error) {
        console.log(error);
      }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
