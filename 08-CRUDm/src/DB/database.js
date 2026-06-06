const mysql = require('mysql2');

//creamos la conexión
const pool = mysql.createPool({
    host : 'localhost',
    user :'root',
    password : 'Adg135z6c67adg_',
    database : 'practicacrud',
    waitForConnections : true,
    connectionLimit : 10,
    queueLimit : 0
});

//la exportamos para poder usarla
module.express = pool.promise();