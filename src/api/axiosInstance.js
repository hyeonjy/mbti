import axios from "axios";
import { isTokenExpired } from "../utils/tokenUtils";

const API_URL = "https://moneyfulpublicpolicy.co.kr";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  // 토큰이 만료됐는지 체크
  if (token && isTokenExpired(token)) {
    alert("토큰이 만료되었습니다. 로그아웃됩니다^^");
    return Promise.reject(new Error("Token expired"));
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
