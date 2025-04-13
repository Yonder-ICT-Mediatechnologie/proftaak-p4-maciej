import express from "express";
import { checkLogIn, query, removePassword } from "./Functions.js";

const router = express.Router();

router.use(checkLogIn);

router.post("/userSearch", async (req, res) => {
    const input = req.body.input;
    const [result, succes] = await query(
        "SELECT * FROM users WHERE username LIKE ? AND Id != ? ORDER BY username ASC LIMIT 10;",
        [`${input}%`, req.user.Id],
        res,
    );
    if (!succes) return;

    const users = (result[0] as User[]).map((user) => removePassword(user));

    res.json({ result: users });
});

export default router;
