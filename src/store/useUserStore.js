import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login, updateProfile } from "../api/auth";
import Cookies from "js-cookie";

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

          Cookies.set("accessToken", responseData.accessToken, {
            path: "/",
            secure: false,
            sameSite: "strict",
          });
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
        const token = Cookies.get("accessToken");
        try {
          const responseData = await updateProfile(token, formData);
          set({ nickname: responseData.nickname });
          return responseData;
        } catch (error) {
          console.log("프로필 업데이트 실패: ", error);
          throw error;
        }
      },

      logout: () => {
        Cookies.remove("accessToken");
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
