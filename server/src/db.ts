import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost', // Change to your MySQL server host
    user: 'maciej', // Your MySQL username
    password: '', // Your MySQL password
    database: 'machat', // Your database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

const promisePool = pool.promise(); // Enable Promises for async/await

export default promisePool;
