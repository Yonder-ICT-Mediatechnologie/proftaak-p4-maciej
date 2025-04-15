import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:3000",
    baseURL: "https://machat-server.glitch.me/",
    withCredentials: true, // important for sending cookies!
});

export default api;
