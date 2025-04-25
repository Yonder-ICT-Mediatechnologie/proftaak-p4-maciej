import { Socket, Server as SocketIOServer } from "socket.io";

class Class {
    private static instance: Class;
    oi?: SocketIOServer;
    users = new Map<number, Socket>();

    public static get(): Class {
        if (!Class.instance) {
            Class.instance = new Class();
        }
        return Class.instance;
    }
}

export const SocketService = Class.get();
