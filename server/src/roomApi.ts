import express from "express";
import { checkLogIn, query } from "./Functions.js";
import { NumericType } from "mongodb";

const router = express.Router();

export async function joinRoom(
    data: { userId: number; roomId: number; isAdmin?: boolean; isOwner?: boolean },
    res,
) {
    const { userId, roomId, isOwner } = data;
    const isAdmin = isOwner || data.isAdmin;

    { // Check if user is already in the room
        const [result, success] = await query(
        "SELECT `UserId` FROM `userchatrooms` WHERE UserId = ? AND RoomId = ?",
        [userId, roomId],
            res,
        );
        if(!success) return
        if (result[0][0]) {
            res.json({error: "User is already in the room"})
            return
        }
    }

    const [result, success] = await query(
        "INSERT INTO `userchatrooms`(`UserId`, `RoomId`, `IsAdmin`, `IsOwner`) VALUES ('?','?','?','?')",
        [userId, roomId, isAdmin ? 1 : 0, isOwner ? 1 : 0],
        res,
    );
    return success;
}

async function inRoomAuth(
    req,
    res,
    roomId
) {
    const [result, success] = await query(
        "SELECT * FROM `userchatrooms` WHERE userId = ? AND RoomId = ?",
        [req.user.Id, roomId],
        res,
    );
    if (!success) return
    if (!result[0][0]) {
        res.json({ error: "Not authenticated" })
        return
    }
    return result[0][0] as Ranks
}

// Check if user is logged in
router.use(checkLogIn);

//--

router.post("/create", async (req, res) => {
    // Get room id
    const [result, success] = await query("SELECT COUNT(*) FROM `chatrooms`", [], res);
    if (!success) return;
    const roomId = result[0][0]["COUNT(*)"] + 1;

    {
        // Create chat room
        const [result, success] = await query(
            "INSERT INTO `chatrooms`(Id, Name, IsPublic) VALUES (?, ?, ?);",
            [roomId, req.body.roomName, req.body.isPublic],
            res,
        );
        if (!success) return;
    }

    {
        // Put owner in chatroom
        const success = joinRoom({ userId: req.user.Id, roomId: roomId, isOwner: true }, res);
        if (!success) return;
    }

    res.json({message: `Created room "${req.body.roomName}" succesfully! ╰(*°▽°*)╯`});
});

//--

router.post("/myRooms", async (req, res) => {
    // Get rooms user is in
    const [result, success] = await query(
        `SELECT chatrooms.*
FROM chatrooms
JOIN userchatrooms ON chatrooms.Id = userchatrooms.RoomId WHERE UserId = ?
`,
        [req.user.Id],
        res,
    );
    if (!success) return;
    const rooms = result[0];

    res.json({ rooms: rooms });
});

//--

router.post("/myRanks", async (req, res) => {
    const roomId = req.body.roomId;
    const ranks = await inRoomAuth(req, res, roomId);
    if (!ranks) return

    res.json({ result: ranks });
});

//--

router.post("/addUser", async (req, res) => {
    const roomId = req.body.roomId;
    const ranks = await inRoomAuth(req, res, roomId);
    if (!ranks) return
    if (!ranks.IsAdmin) {
        res.json({ error: "Not authenticated" });
        return
    }

    const success = joinRoom({ userId: req.body.userId, roomId }, res)
    if (!success) return

    res.json({});
});

//--

router.post("/send", async (req, res) => {
    const roomId = req.body.roomId;
    const message = req.body.message
        if (message === "") {
        res.json({ error: "message is empty" });
        return
    }
    const ranks = await inRoomAuth(req, res, roomId);
    if (!ranks) return

    const [result, success] = await query(
        `INSERT INTO messages(UserId, RoomId, Content) VALUES (?,?,?)`,
        [req.user.Id, roomId, message],
        res,
    );
    if (!success) return;

    res.json({});
});

//--

router.post("/getChat", async (req, res) => {
    const roomId = req.body.roomId;
    const ranks = await inRoomAuth(req, res, roomId);
    if (!ranks) return

    const [result, success] = await query(
        `SELECT
        messages.Id AS MessageId,
        messages.UserId,
        messages.Content,
        messages.Timestamp,
        users.Username,
        users.UsernameId
        FROM messages JOIN users ON users.Id = messages.UserId WHERE RoomId = ?`,
        [roomId],
        res,
    );
    if (!success) return;

    res.json({result: result[0]});
});

export default router;
