import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";

const Header = () => {
  const { isAuthenticated } = useUserStore();
  const { logout } = useUserStore();
  const navigate = useNavigate();

  return (
    <header className="bg-primary-color p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center text-tomato">
        <Link to="/">홈</Link>
        <div className="space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/profile">프로필</Link>
              <Link to="/test">테스트</Link>
              <Link to="/testresult">결과 보기</Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
