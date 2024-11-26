import axios from "axios";
import { isTokenExpired } from "../utils/tokenUtils";

const API_URL = "http://localhost:4000/testResults";

const testAxiosInstance = axios.create({
  baseURL: API_URL,
});

testAxiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      console.log("토큰 만료 여부 체크: ", isTokenExpired(token));

      if (isTokenExpired(token)) {
        console.log("토큰이 만료되었습니다.");
        return Promise.reject(new Error("Token expired"));
      }
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

export default testAxiosInstance;
