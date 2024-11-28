import axios from "axios";
import { getUserProfile } from "./auth";

const API_URL = "https://diagnostic-far-wisteria.glitch.me/testResults";

// Axios 인스턴스 생성
const testAxiosInstance = axios.create({
  baseURL: API_URL,
});

testAxiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");

    // 토큰 만료 여부 체크
    if (token) {
      // 토큰의 유효성 확인을 위해 사용자 정보를 요청
      try {
        await getUserProfile();
      } catch (error) {
        console.log("토큰이 만료되었습니다.");
        return Promise.reject(new Error("Token expired"));
      }

      // 요청 헤더에 Authorization 추가
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
