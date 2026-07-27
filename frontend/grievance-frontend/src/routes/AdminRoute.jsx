import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function AdminRoute({ children }) {

    const { token, mode, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }

    if (mode !== "admin") {
        return <Navigate to="/user/dashboard" replace />;
    }

    return children;

}

export default AdminRoute;