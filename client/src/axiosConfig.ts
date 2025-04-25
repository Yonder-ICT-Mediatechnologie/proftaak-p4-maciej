import axios from "axios";
import { Config } from "./Config";

const api = axios.create({
    baseURL: Config.baseURL,
    withCredentials: true, // important for sending cookies!
});

export default api;
