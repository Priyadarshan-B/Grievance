import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function UserRoute({ children }) {

    const { token, mode, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (mode !== "user") {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return children;

}

export default UserRoute;