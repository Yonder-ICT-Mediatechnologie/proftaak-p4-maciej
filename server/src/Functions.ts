import db from "./db.js";
import { Response } from "express";

export async function query(
    query: string,
    values: (number | string)[],
    res?: Response,
): Promise<[unknown, boolean]> {
    try {
        return [await db.query(query, values), true];
    } catch (error) {
        console.log(error.sql, error.sqlMessage);
        if (res !== undefined) res.json({ error: `database error` });
        return [undefined, false];
    }
}

export function removePassword(user: User) {
    const { Password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

export function checkLogIn(req, res, next) {
    if (!req.isAuthenticated()) {
        res.json({ error: "Not authenticated", auth: false });
        return;
    }
    next();
}

declare global {
    interface Ranks {
        IsAdmin: 1 | 0
        IsOwner: 1 | 0
    }

    interface Message {
    MessageId: number,
    UserId: number,
    RoomId: number,
    Content: string,
    Timestamp: string,
    Username: string,
    UsernameId: number,
}
}
