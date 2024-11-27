import axios from "axios";
import { isTokenExpired } from "../utils/tokenUtils";
import { getUserProfile } from "./auth";

const API_URL = "http://localhost:4000/testResults";

const testAxiosInstance = axios.create({
  baseURL: API_URL,
});

testAxiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      console.log("토큰 만료 여부 체크: ", isTokenExpired(token));

      // getUserProfile로 토큰 유효성 체크
      try {
        await getUserProfile();
      } catch (error) {
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
