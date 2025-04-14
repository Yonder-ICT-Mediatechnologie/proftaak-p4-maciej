import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import "./authentication.js";
import MySQLStoreFactory from "express-mysql-session";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;

const MySQLStore = MySQLStoreFactory(session);
const sessionStore = new MySQLStore({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);

app.use(
    session({
        secret: "your_secret",
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
    }),
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

import accountRouter from "./accountApi.js";
app.use("/auth", accountRouter);

import getDataRouter from "./requestDataApi.js";
app.use("/request", getDataRouter);

import manageRoomApi from "./roomApi.js";
app.use("/room", manageRoomApi);

// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey: "AIzaSyCysiIBgPpCRrpMtOKeOiB_6RIhJeoaSDQ" });

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.0-flash",
//     contents: "Write a short story about a cat who loves to play with yarn.",

//   });
//   console.log(response.text);
// }

// main();
