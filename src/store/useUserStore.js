import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login, updateProfile } from "../api/auth";

// Zustand를 사용한 사용자 상태 관리 스토어 생성
const useUserStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false, // 사용자 인증 상태
      user: {
        userId: null, // 사용자 ID
        nickname: null, // 사용자 닉네임
      },

      // 로그인 함수
      login: async (data) => {
        try {
          const responseData = await login({
            id: data.id,
            password: data.password,
          });

          console.log("response data: ", responseData);

          localStorage.setItem("accessToken", responseData.accessToken);

          // 인증 상태와 사용자 정보 설정
          set({
            isAuthenticated: true,
            user: {
              userId: data.id,
              nickname: responseData.nickname,
            },
          });
        } catch (error) {
          console.error("Login error:", error);
          throw error;
        }
      },

      // 프로필 업데이트 함수
      profileUpdate: async (formData) => {
        try {
          const responseData = await updateProfile(formData);

          // 상태 업데이트: 닉네임 변경
          set((state) => ({
            ...state,
            user: {
              ...state.user,
              nickname: responseData.nickname,
            },
          }));
          return responseData;
        } catch (error) {
          console.log("프로필 업데이트 실패: ", error);
          throw error;
        }
      },

      // 로그아웃 함수
      logout: () => {
        localStorage.removeItem("accessToken");

        // 상태 초기화: 인증 상태와 사용자 정보 초기화
        set({
          isAuthenticated: false,
          user: {
            userId: null,
            nickname: null,
          },
        });
      },
    }),
    {
      name: "user", // 로컬 스토리지에 저장될 키 이름
      partialize: (state) => ({
        // 로컬 스토리지에 저장할 상태 선택
        isAuthenticated: state.isAuthenticated,
        user: {
          userId: state.user?.userId,
          nickname: state.user?.nickname,
        },
      }),
    }
  )
);

export default useUserStore;
