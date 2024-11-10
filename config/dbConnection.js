const mysql = require('mysql2');

const host = 'localhost';
const database = 'ticketflow';
const user = 'root';
const password = 'admin';

module.exports = () => {
  return dbConnection = mysql.createConnection({
      host: host,
      user: user,
      password: password, 
      database: database
    });
    
}