const mysql = require('mysql');

const poolMySQL  = mysql.createPool({
    connectionLimit : 10,
    host: 'mysql',
    user: 'api',
    password: 'api',
    database: 'api',
    port: 3306
});

module.exports = poolMySQL;
