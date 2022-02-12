import { Route, Navigate } from "react-router-dom";
import { useAuthState } from "../context/AuthContext";

const PublicRoute = ({ component: C, ...props }) => {
  const { isAuthenticated } = useAuthState();
  console.log("Unauthenticated Route", isAuthenticated);
  return (
    <Route
      {...props}
      render={(routeProps) =>
        !isAuthenticated ? <C {...routeProps} /> : <Navigate to="/events" />
      }
    />
  );
};

export { PublicRoute };
