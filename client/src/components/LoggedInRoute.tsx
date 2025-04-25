import React, { JSX, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axiosConfig";
import { setLocalStorage } from "../Functions";

const LoginRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = React.useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/auth/me");
                const user = response.data.user;
                setLocalStorage("user", user);

                setUser(user);
                if (!user) navigate("/login");
            } catch (error) {
                console.error("Auth check failed:", error);
                navigate("/login");
            }
        };

        fetchUser();
    }, [navigate]);

    if (!user) return <h1>Loading...</h1>;

    return children;
};

export default LoginRoute;
