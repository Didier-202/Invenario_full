require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

const mysql = require('mysql2/promise');

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT || 3306),
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
};

const pool = mysql.createPool(config);

module.exports = pool;