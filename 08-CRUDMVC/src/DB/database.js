const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'Adg135z6c67adg_',
    database : 'practicacrud',
    waitForConnections : true,
    connectionLimit : 10,
    queueLimit : 0
});

module.exports = pool;