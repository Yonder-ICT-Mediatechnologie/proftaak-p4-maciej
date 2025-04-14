// importDB.ts
import fs from "fs";
import path from "path";
import db from "./db.js"; // assuming db.ts exports a mysql2 connection

import { fileURLToPath } from "url";

// 👇 Manual __filename and __dirname setup for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sqlFilePath = path.join(__dirname, "../../database.sql");
try {
    const sql = fs.readFile(sqlFilePath, () => {});
    console.log("SQL file loaded!");
} catch (err) {
    console.error("❌ Could not read SQL file:", err.message);
}

async function importSQL() {
    try {
        const importSQL = fs.readFileSync(sqlFilePath, "utf-8");

        await db.query(importSQL);
    } catch (readErr) {
        console.error("❌ Error reading SQL file:", readErr);
        process.exit(1);
    }
}

importSQL();
