import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";

const Header = () => {
  const { isAuthenticated } = useUserStore(); // 사용자의 로그인 인증 여부 확인
  const { logout } = useUserStore(); // 로그아웃 함수 가져오기
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 w-full bg-gray-50 p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center text-tomato">
        <Link to="/">홈</Link>

        {/* 우측 네비게이션 메뉴 */}
        <div className="space-x-4">
          {/* 사용자가 인증된 경우 */}
          {isAuthenticated ? (
            <>
              <Link to="/profile">프로필</Link>
              <Link to="/test">테스트</Link>
              <Link to="/results">결과 보기</Link>
              <button
                className="bg-tomato text-white px-3 p-2 rounded-md hover:text-gray-300 hover:bg-gray-100 "
                onClick={() => {
                  logout();
                  navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
                }}
              >
                로그아웃
              </button>
            </>
          ) : (
            // 로그인되지 않은 경우 로그인 링크 표시
            <Link to="/login">로그인</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
