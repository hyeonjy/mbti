import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../api/auth";
import showAlert from "../utils/showAlert";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      const responseData = await signUp({
        id: data.id,
        password: data.password,
        nickname: data.nickname,
      });
      if (responseData.success) {
        showAlert({ title: "회원가입이 완료되었습니다." });

        navigate("/login");
      } else {
        console.log("회원가입 실패");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-4xl font-bold text-primary-color mb-6 text-center">
          회원가입
        </h1>
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

          <div>
            <input
              type="text"
              {...register("nickname", { required: "닉네임을 입력해주세요." })}
              placeholder="닉네임"
              className="w-full p-4 border border-gray-300 rounded-lg"
            />
            {errors.nickname && (
              <p className="text-red-500 text-sm mt-2">
                {errors.nickname.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-tomato text-white py-3 rounded-lg hover:bg-gray-50 transition duration-300 hover:text-[#FF5A5F]"
          >
            회원가입
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            이미 계정이 있으신가요?
            <Link
              to="/login"
              className="text-tomato hover:text-[#5B6471] hover:underline transition"
            >
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
