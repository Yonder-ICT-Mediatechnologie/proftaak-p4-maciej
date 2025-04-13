import React, { JSX, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axiosConfig";

const Component: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/auth/me");
                const user = response.data.user;
                localStorage.setItem("user", JSON.stringify(user));

                if (user) {
                    navigate("/");
                } else {
                    localStorage.removeItem("user");
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                navigate("/login");
            }
        };

        fetchUser();
    }, [navigate]);

    return children;
};

export default Component;
