import { io, Socket } from "socket.io-client";
import { Config } from "../Config";

class Class {
    private static instance: Class;
    Socket: Socket;

    constructor() {
        this.Socket = io(Config.baseURL, {
            withCredentials: true,
        });
    }

    public static get(): Class {
        if (!Class.instance) {
            Class.instance = new Class();
        }
        return Class.instance;
    }
}

export const SocketController = Class.get();
