const mysql = require('mysql2');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',         
  password: '!Shirishahor2005',         
  database: 'DrawingWebsiteDB'   
}).promise();

module.exports = connection;