import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import "./authentication.js";
import MySQLStoreFactory from "express-mysql-session";
import dotenv from "dotenv";
import http from "http";
import { Server as SocketIO } from "socket.io";
import sharedSession from "express-socket.io-session";

dotenv.config();
const app = express();
const port = 3000;
const server = http.createServer(app);
const io = new SocketIO(server, {
    cors: {
        origin: "https://m.machat.workers.dev",
        // origin: "http://localhost:5173",
        credentials: true,
    },
});
SocketService.oi = io;

const MySQLStore = MySQLStoreFactory(session);
const sessionStore = new MySQLStore({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

const allowedOrigins = [
    "https://m.machat.workers.dev",
    "http://localhost:5173",
    "http://localhost:5174",
];
app.set("trust proxy", 1);

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like curl or mobile apps)
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error(`CORS not allowed origin: ${origin}`))
            }
        },
        credentials: true,
    }),
);
app.use(express.json());

const sessionMiddleware = session({
    secret: "your_secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
});
io.use(sharedSession(sessionMiddleware, { autoSave: true }));

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
// });

import accountRouter from "./accountApi.js";
app.use("/auth", accountRouter);

import getDataRouter from "./requestDataApi.js";
app.use("/request", getDataRouter);

import manageRoomApi from "./roomApi.js";
import { SocketService } from "./Services/SocketService.js";
import { query } from "./Functions.js";
app.use("/room", manageRoomApi);

io.on("connection", async (socket) => {
    type Handshake = typeof socket.handshake;
    const { passport } = (
        socket.handshake as Handshake & { session: { passport: { user: number } } }
    ).session;
    if (!passport || !passport.user) return;

    SocketService.users.set(passport.user, socket);
    socket.on("disconnect", () => {
        SocketService.users.delete(passport.user);
    });

    // Join the user to their chat rooms
    const [result, success] = await query(`SELECT RoomId FROM userchatrooms WHERE UserId = ?`, [
        passport.user,
    ]);
    if (!success) return;
    const rooms = result[0].map((data) => `room:${data.RoomId}`);
    socket.join(rooms);
});

// Ensure the server listens on the correct port
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
