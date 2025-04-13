import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axiosConfig";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await api.post("/auth/login", { email, password });
        setErrorMessage(response.data.message);

        if (response.data.user) {
            navigate("/");
        }
    };

    return (
        <div
            className="App"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                boxSizing: "border-box",
            }}
        >
            <h1>Log in</h1>

            <span
                style={{
                    color: "red",
                }}
            >
                {errorMessage}
            </span>

            <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "300px",
                    gap: "10px",
                }}
                onSubmit={handleSubmit}
            >
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(input) => setEmail(input.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(input) => setPassword(input.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
            <a href="/register">register</a>
        </div>
    );
}

export default Login;
