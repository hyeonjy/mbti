import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AuthFormFooter from "./AuthFormFooter";

const AuthForm = ({ onSubmit, mode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data);

      // 모드에 따라 회원가입 후 로그인 페이지로, 로그인 후 메인 페이지로 이동
      if (mode === "signup") {
        navigate("/login");
      } else if (mode === "login") {
        navigate("/");
      }
    } catch (error) {
      console.error(`${mode === "signup" ? "회원가입" : "로그인"} 실패`, error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-primary-color mb-6">
          {mode === "signup" ? "회원가입" : "로그인"}
        </h1>

        {/* 폼 */}
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-md"
        >
          {/* 아이디 입력 필드 */}
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

          {/* 비밀번호 입력 필드 */}
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

          {/* 닉네임 입력 필드 (회원가입 모드일 때만 표시) */}
          {mode === "signup" && (
            <div>
              <input
                type="text"
                {...register("nickname", {
                  required: "닉네임을 입력해주세요.",
                })}
                placeholder="닉네임"
                className="w-full p-4 border border-gray-300 rounded-lg"
              />
              {errors.nickname && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.nickname.message}
                </p>
              )}
            </div>
          )}

          {/* 제출 버튼 */}
          <button
            type="submit"
            className="w-full bg-tomato text-white py-3 rounded-lg hover:bg-gray-50 transition duration-300 hover:text-[#FF5A5F]"
          >
            {mode === "signup" ? "회원가입" : "로그인"}
          </button>
        </form>

        {/* 푸터 컴포넌트 */}
        <AuthFormFooter mode={mode} />
      </div>
    </div>
  );
};

export default AuthForm;
