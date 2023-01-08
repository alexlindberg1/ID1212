import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import LogoutButton from "../components/LogoutButton";
import useUserState from "../hooks/useUserState";

import "../index.css";

function Root() {
    const location = useLocation();
    // const user = JSON.parse(localStorage.getItem("user"));
    const user = useUserState()?.user;

    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem("user"));
        if (location.pathname === "/login" && user?.isAuthenticated) {
            window.location.pathname = "/home";
        } else if (location.pathname !== "login" && !user?.isAuthenticated) {
            window.location.pathname = "/login";
        }
    }, [user, location.pathname]);

    return (
        <div className="Root">
            <h1>Sug min Jarak bitch</h1>
            <LogoutButton />
        </div>
    );
}

export default Root;
