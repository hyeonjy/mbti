import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login, updateProfile } from "../api/auth";

const useUserStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      nickname: null,

      login: async (data) => {
        try {
          const responseData = await login({
            id: data.id,
            password: data.password,
          });

          console.log("response data: ", responseData);

          localStorage.setItem("accessToken", responseData.accessToken);
          set({
            isAuthenticated: true,
            nickname: responseData.nickname,
          });
        } catch (error) {
          console.error("Login error:", error);
          throw error;
        }
      },

      profileUpdate: async (formData) => {
        try {
          const responseData = await updateProfile(formData);
          set({ nickname: responseData.nickname });
          return responseData;
        } catch (error) {
          console.log("프로필 업데이트 실패: ", error);
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem("accessToken");
        set({ isAuthenticated: false, nickname: null });
      },
    }),
    {
      name: "user",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        nickname: state.nickname,
      }),
    }
  )
);

export default useUserStore;
