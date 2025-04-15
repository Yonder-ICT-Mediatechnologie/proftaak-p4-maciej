import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axiosConfig";

function Login() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await api.post("/auth/register", { email, username, password });
        setErrorMessage(response.data.error);

        if (response.data.user) {
            navigate("/");
        }
    };

    return (
        <div
            className="container"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
            }}
        >
            <h1>Register</h1>

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
                    type="text"
                    placeholder="Username"
                    onChange={(input) => setUsername(input.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(input) => setPassword(input.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
            <a href="/login">login</a>
        </div>
    );
}

export default Login;
