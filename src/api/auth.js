import axiosInstance from "./axiosInstance";

export const signUp = async (userData) => {
  const response = await axiosInstance.post("/register", userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axiosInstance.post("/login?expiresIn=10m", userData);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await axiosInstance.get("/user");
  return response.data;
};

export const updateProfile = async (formData) => {
  const response = await axiosInstance.patch("/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
