import { useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import showAlert from "../utils/showAlert";

const useTokenExpire = () => {
  const navigate = useNavigate();
  const { logout } = useUserStore.getState();

  const handleExpire = () => {
    logout();

    showAlert({
      title: "토큰 만료로 로그아웃 처리됩니다.",
    });

    navigate("/login");
  };

  return handleExpire;
};

export default useTokenExpire;
