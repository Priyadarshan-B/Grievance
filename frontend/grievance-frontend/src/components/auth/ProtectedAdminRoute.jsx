import { Navigate, Outlet } from "react-router-dom";

function ProtectedAdminRoute() {
  const token = localStorage.getItem("token");
  const mode = localStorage.getItem("mode");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  if (mode !== "admin") {
    localStorage.clear();
    return <Navigate to="/admin/login" replace />;
  }

  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user.role !== "super_admin" && user.role !== "dept_admin") {
      localStorage.clear();
      return <Navigate to="/admin/login" replace />;
    }
  } catch {
    localStorage.clear();
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedAdminRoute;
