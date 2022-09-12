import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";

const Middleware = () => {
    const { auth, setAuth } = useAuthContext();
    const location = useLocation();
    const to = location.state?.to?.pathname || "/";

    useEffect(() => {
        if (
            localStorage.getItem("user") != null &&
            localStorage.getItem("token") != null
        ) {
            setAuth({
                user: localStorage.getItem("user"),
                token: localStorage.getItem("token"),
            });
        }
    }, []);

    return auth?.user ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default Middleware;
