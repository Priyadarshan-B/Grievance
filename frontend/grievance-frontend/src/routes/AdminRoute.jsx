import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function AdminRoute({ children }) {
  const { token, mode, user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  if (mode !== "admin") {
    return <Navigate to="/user/dashboard" replace />;
  }

  if (user?.role !== "super_admin" && user?.role !== "department_admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default AdminRoute;
