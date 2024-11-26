import axios from "axios";
import { isTokenExpired } from "../utils/tokenUtils";

const API_URL = "https://moneyfulpublicpolicy.co.kr";
const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("accessToken");

  // 토큰 만료 여부 체크
  if (token) {
    console.log("토큰 만료 여부 체크: ", isTokenExpired(token));

    try {
      await axios.get(`${API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log("토큰 만료 에러: ", error);

      return Promise.reject(new Error("Token expired"));
    }

    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
