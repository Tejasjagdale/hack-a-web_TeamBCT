import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthState } from "../context/AuthContext";

const PrivateRoute = ({ component: C, ...props }) => {
  const { isAuthenticated } = useAuthState();
  const location = useLocation();
  console.log("Authenticated Route", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return <Outlet />;
};

export { PrivateRoute };
