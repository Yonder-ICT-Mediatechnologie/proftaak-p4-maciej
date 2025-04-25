/* eslint-disable no-undef */
import mysqldump from "mysqldump";
import dotenv from "dotenv";
dotenv.config();
const c = async () => {
  const result = await mysqldump({
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    dumpToFile: '../database_backup.sql',
  })

  console.log(result); // Should contain CREATE TABLE statements
}
c();
