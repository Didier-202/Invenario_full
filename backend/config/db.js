const mysql = require('mysql2/promise');
const config = {
    host: "127.0.0.1",
    user: 'root',
    password: '123456',
    database: 'sistema_inventario',
    port: 3306,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
};

const pool = mysql.createPool(config);

module.exports = pool;