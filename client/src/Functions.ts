import { AxiosResponse } from "axios";

export const getUser = (): User | undefined => {
    const string = localStorage.getItem('user');
    if (string && string !== 'undefined') {
        return JSON.parse(string);
    }
};

export const setLocalStorage = (name: string, value: unknown) => {
    localStorage.setItem(name, JSON.stringify(value));
    window.dispatchEvent(new Event("storage"));
};

export const handleResponse = (response: AxiosResponse): boolean => {
    if (response.data.message) { console.log(response.data.message) }
    if (response.data.auth !== undefined && !response.data.auth) {
        localStorage.removeItem('user');
        window.location.href = '/login';
    }
    return response.data.message === undefined
};

declare global {
    interface User {
        Id: number;
        Username: string;
        UsernameId: number;
        Email: string;
    }
}
