import db from './db.js';
import { Response } from 'express';


export async function query(
    query: string,
    values: (number | string)[],
    res?: Response,
): Promise<[unknown, boolean]> {
    try {
        return [await db.query(query, values), true];
    } catch (error) {
        console.log(error.sql, error.sqlMessage);
        if (res !== undefined) res.json({ message: `database error` });
        return [undefined, false];
    }
}

export function removePassword(user: User) {
    const { Password, ...userWithoutPassword } = user;
    return userWithoutPassword
}
