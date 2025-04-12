import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import "./authentication.js"

const app = express();
const port = 3000;

app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    }),
);
app.use(
    session({
        secret: 'secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // use true in production with HTTPS
    }),
);
app.use(passport.initialize());
app.use(passport.session());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

import accountRouter from './accountApi.js';
app.use('/auth', accountRouter);

import getDataRouter from './requestDataApi.js';
app.use('/request', getDataRouter);


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
