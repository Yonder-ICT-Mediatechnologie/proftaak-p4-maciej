import { AxiosResponse } from "axios";

export const getLocalStorage = (name: string) => {
    const string = localStorage.getItem(name);
    if (string && string !== "undefined") {
        return JSON.parse(string);
    }
};

export const setLocalStorage = (name: string, value: unknown) => {
    localStorage.setItem(name, JSON.stringify(value));
    window.dispatchEvent(new Event("storage"));
};

export const handleResponse = (response: AxiosResponse): boolean => {
    const success = response.data.error === undefined;

    if (success) {
        if (response.data.message) alert(response.data.message);
    } else {
        console.warn(response.data.error);
    }

    if (response.data.auth !== undefined && !response.data.auth) {
        localStorage.removeItem("user");
        window.location.href = "/login";
    }
    return success;
};

declare global {
    interface User {
        Id: number;
        Username: string;
        UsernameId: number;
        Email: string;
    }

    interface Room {
        Id: number;
        Name: string;
        IsPublic: number;
    }

    interface Ranks {
        IsAdmin: 1 | 0;
        IsOwner: 1 | 0;
    }

    interface Message {
        MessageId: number;
        UserId: number;
        RoomId: number;
        Content: string;
        Timestamp: string;
        Username: string;
        UsernameId: number;
    }

    type Simplify<T> = { [K in keyof T]: T[K] } & {};
}
