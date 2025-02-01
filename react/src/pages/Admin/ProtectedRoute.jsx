import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../providers/userContext";

const ProtectedRoute = ({ requiredRole }) => {
  const { user } = useStateContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
