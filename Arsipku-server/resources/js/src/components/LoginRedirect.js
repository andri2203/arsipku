import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";
import API from "../utils/RestApi";

const LoginRedirect = () => {
    const api = new API();
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
        <Navigate to={to} state={{ from: "/login" }} replace />
    ) : (
        <Outlet />
    );
};

export default LoginRedirect;
