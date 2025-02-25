import { Navigate, Outlet } from "react-router-dom";
import useLoginAuthStore from "../Store/useLoginAuthStore.jsx";

const ProtectedRoute = () => {
  const { isAuthenticated } = useLoginAuthStore();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
