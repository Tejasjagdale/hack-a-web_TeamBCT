import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ component: C, ...props }) => {
  const { isAuthenticated } = useAuth();
  return (
    <Route
      {...props}
      render={(routeProps) =>
        !isAuthenticated ? <C {...routeProps} /> : <Navigate to="/" />
      }
    />
  );
};

export { PublicRoute };
