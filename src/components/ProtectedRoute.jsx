import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../store/useUserStore";

const ProtectedRoute = () => {
  const { isAuthenticated } = useUserStore();

  // 사용자가 인증되었으면 자식 컴포넌트 렌더링
  // 인증되지 않았으면 로그인 페이지로 리다이렉트
  return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default ProtectedRoute;
