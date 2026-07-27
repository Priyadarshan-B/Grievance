import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function GuestRoute({ children }) {

    const { token, mode, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (token) {

        return (
            <Navigate
                to={
                    mode === "admin"
                        ? "/admin/dashboard"
                        : "/user/dashboard"
                }
                replace
            />
        );

    }

    return children;

}

export default GuestRoute;