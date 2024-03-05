import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const LoggedOutRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default LoggedOutRoute;
