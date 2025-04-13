import React, { JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axiosConfig";
import { setLocalStorage } from "../Functions";

const LoginRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const [user, setUser] = useState<null | object>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/auth/me");
                const user = response.data.user;
                setUser(user);
                setLocalStorage("user", user);

                if (!user) navigate("/login");
            } catch (error) {
                console.error("Auth check failed:", error);
                setUser(null);
                navigate("/login");
            }
        };

        fetchUser();
    }, [navigate]);

    // if (!user) return null; // or loading spinner

    return children;
};

export default LoginRoute;
