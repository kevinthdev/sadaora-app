import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/" />;
};

export default AuthGuard;
