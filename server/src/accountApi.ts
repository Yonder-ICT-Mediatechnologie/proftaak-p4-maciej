import express from "express";
import bcrypt from "bcrypt";
import { Response } from "express";
import passport from "passport";
import { query } from "./Functions.js";
import { joinRoom } from "./roomApi.js";

const router = express.Router();

async function getUserByEmail(res: Response, email: string): Promise<[User | undefined, boolean]> {
    const [result, success] = await query("SELECT * FROM users WHERE Email = ?", [email], res);
    if (!success) return [undefined, false];
    return [result[0], true];
}

router.post("/login", async (req, res, next) => {
    // Check if email & password are valid
    passport.authenticate("local", (err, user: User, info) => {
        if (user === undefined) return res.json({ error: info.message });

        // Save user in session
        req.login(user, (err) => {
            if (err) return res.json({ error: "Login failed" });
            const { Password, ...userWithoutPassword } = user;
            res.json({ user: userWithoutPassword });
        });
    })(req, res, next);
});

router.get("/", (req, res) => {
    res.send("Hello World!");
});

router.delete("/logout", (req, res) => {
    req.logOut((err) => {
        if (err) {
            return res.json({ error: "Logout failed" });
        }
        res.json({});
    });
});

router.get("/me", (req, res) => {
    if (req.isAuthenticated()) {
        const { Password, ...userWithoutPassword } = req.user as User;
        res.json({ user: userWithoutPassword });
    } else {
        res.json({ error: "Not authenticated", auth: false });
    }
});

router.post("/register", async (req, res, next) => {
    const { email, password, username } = req.body as {
        email: string;
        password: string;
        username: string;
    };

    for (const [keyname, value] of Object.entries(req.body)) {
        if (typeof value !== "string" || value === "") {
            res.json({ error: `${keyname} is empty` });
            return;
        }

        if (value.length < 3) {
            res.json({ error: `${keyname} is too short` });
            return;
        }
    }

    {
        // Check if email is already in use
        const [result, success] = await getUserByEmail(res, email);
        if (!success) return;
        const user = result[0];

        if (user !== undefined) {
            res.json({ error: `${email} is already in use` });
            return;
        }
    }

    let usernameId: number;
    {
        const [result, success] = await query(
            "SELECT COUNT(*) FROM users WHERE username = ?",
            [username],
            res,
        );
        if (!success) return;
        usernameId = (result[0][0]["COUNT(*)"] + 1) as number;
    }

    const hashedPassword = bcrypt.hashSync(password, 10) as string;
    {
        const [result, success] = await query(
            "INSERT INTO users (Username, UsernameId, Password, Email) VALUES (?, ?, ?, ?)",
            [username, usernameId, hashedPassword, email],
            res,
        );
        if (!success) return;
    }

    passport.authenticate("local", (err, user: User, info) => {
        if (user === undefined) return res.json({ error: info.message });

        // Save user in session
        req.login(user, (err) => {
            if (err) return res.json({ error: "Login failed" });
            const { Password, ...userWithoutPassword } = user;
            res.json({ user: userWithoutPassword });
        });

        // Add user to all user sever
        joinRoom({ userId: req.user.Id, roomId: 1 }, res);
    })(req, res, next);
});

export default router;

declare global {
    interface User {
        Id: number;
        Username: string;
        UsernameId: number;
        Password: string;
        Email: string;
    }
}
