import axios from "axios";
import { isTokenExpired } from "../utils/tokenUtils";

const API_URL = "https://moneyfulpublicpolicy.co.kr";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("accessToken");

  // 토큰 만료 여부 체크
  if (token) {
    console.log("토큰 만료 여부 체크: ", isTokenExpired(token));

    try {
      // 토큰의 유효성 확인을 위해 사용자 정보를 요청
      await axios.get(`${API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log("토큰 만료 에러: ", error);

      return Promise.reject(new Error("Token expired"));
    }

    // 요청 헤더에 Authorization 추가
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
