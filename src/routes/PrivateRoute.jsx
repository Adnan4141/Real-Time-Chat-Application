import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import useUserStore from "../app/zustard/userStore";

const PrivateRoute = ({children}) => {
  const location = useLocation();
  const user = useUserStore(state=>state.user)
 
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  
  return children;
};

export default PrivateRoute;