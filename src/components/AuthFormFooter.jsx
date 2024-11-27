import React from "react";
import { Link } from "react-router-dom";

const AuthFormFooter = ({ mode }) => {
  return (
    <div className="mt-4 text-center">
      <p className="text-gray-600">
        {mode === "signup" ? (
          <>
            이미 계정이 있으신가요?{" "}
            <Link
              to="/login"
              className="text-tomato hover:text-[#5B6471] hover:underline transition"
            >
              로그인
            </Link>
          </>
        ) : (
          <>
            계정이 없으신가요?{" "}
            <Link
              to="/signup"
              className="text-tomato hover:text-[#5B6471] hover:underline transition"
            >
              회원가입
            </Link>
          </>
        )}
      </p>
    </div>
  );
};

export default AuthFormFooter;
