import React, { JSX, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axiosConfig";
import { setLocalStorage } from "../Functions";

const LoginRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/auth/me");
                const user = response.data.user;
                setLocalStorage("user", user);

                if (!user) navigate("/login");
            } catch (error) {
                console.error("Auth check failed:", error);
                navigate("/login");
            }
        };

        fetchUser();
    }, [navigate]);

    return children;
};

export default LoginRoute;
