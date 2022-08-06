var mysql = require('mysql');
var connection = mysql.createPool({
    host: 'database-1.codmpreskocs.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: '12345678',
    database: 'item_review'
});
module.exports = connection;