import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useUserStore();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Login Data:", data);
    try {
      await login(data);
      console.log("로그인 성공");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-primary-color mb-6">로그인</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-md"
        >
          <div>
            <input
              type="text"
              {...register("id", { required: "아이디를 입력해주세요." })}
              placeholder="아이디"
              className="w-full p-4 border border-gray-300 rounded-lg"
            />
            {errors.id && (
              <p className="text-red-500 text-sm mt-2">{errors.id.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                minLength: {
                  value: 6,
                  message: "비밀번호는 최소 6자리 이상이어야 합니다.",
                },
              })}
              placeholder="비밀번호"
              className="w-full p-4 border border-gray-300 rounded-lg"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-tomato text-white py-3 rounded-lg hover:bg-gray-50 transition duration-300 hover:text-[#FF5A5F]"
          >
            로그인
          </button>
        </form>

        <div className="mt-4">
          <p className="text-gray-600">
            계정이 없으신가요?
            <Link
              to="/signup"
              className="text-tomato hover:text-[#5B6471] hover:underline transition"
            >
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
