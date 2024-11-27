import React from "react";
import AuthForm from "../components/AuthForm";
import useUserStore from "../store/useUserStore";

const Login = () => {
  const { login } = useUserStore();

  const handleLogin = async (data) => {
    console.log("login data: ", data);
    await login(data);
  };

  return <AuthForm onSubmit={handleLogin} mode="login" />;
};

export default Login;
