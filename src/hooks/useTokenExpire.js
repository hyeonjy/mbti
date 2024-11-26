import { useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";

const useTokenExpire = () => {
  const navigate = useNavigate();
  const { logout } = useUserStore.getState();

  const handleExpire = () => {
    logout();
    navigate("/login");
  };

  return handleExpire;
};

export default useTokenExpire;
