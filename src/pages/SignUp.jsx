import React from "react";
import AuthForm from "../components/AuthForm";
import { signUp } from "../api/auth";
import showAlert from "../utils/showAlert";

const SignUp = () => {
  const handleSignUp = async (data) => {
    const responseData = await signUp({
      id: data.id,
      password: data.password,
      nickname: data.nickname,
    });

    if (responseData.success) {
      showAlert({ title: "회원가입이 완료되었습니다." });
    } else {
      throw new Error("회원가입 실패");
    }
  };

  return <AuthForm onSubmit={handleSignUp} mode="signup" />;
};

export default SignUp;
