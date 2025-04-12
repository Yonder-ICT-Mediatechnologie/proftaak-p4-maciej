import db from './db.js';
import bcrypt from 'bcrypt';
import { Response } from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local';

declare module 'express-serve-static-core' {
    interface Request {
        login(user: User, callback: (err: Error | null) => void): void;
        logOut(callback: (err: Error | null) => void): void;
        isAuthenticated: () => boolean;
        user: User;
    }
}

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


passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        // get user
        const [result, success] = await query('SELECT * FROM users WHERE Email = ?', [email]);
        if (!success) return done(null, false, { message: 'Database error' });

        const user = result[0][0] as User;
        if (!user) return done(null, false, { message: 'Incorrect username' });

        // console.log(password, user.Password)
        bcrypt.compare(password, user.Password, (err, res) => {
            if (res) return done(null, user);
            else return done(null, false, { message: 'Incorrect password' });
        });
    }),
);

passport.serializeUser((user: User, done) => {
    done(null, user.Id);
});

passport.deserializeUser(async (id, done) => {
    const [result, success] = await query('SELECT * FROM users WHERE Id = ?', [id]);
    if (!success) return done(null, false, { message: 'Database error' });
    const user = result[0][0] as User;
    if (!user) return done(null, false, { message: 'User not found' });
    done(null, user);
});
