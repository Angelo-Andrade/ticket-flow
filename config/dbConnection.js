const mysql = require("mysql2");
require('dotenv').config({ path: './config/infoconn.env' });

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_DATABASE;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;


module.exports = () => {
  return (dbConnection = mysql.createConnection({
    host: host,
    port: port,
    user: user,
    password: password,
    database: database
  }));
  console.log('[dbConnection] conexão aberta');
};

module.exports.closeConnection = (connection) => {
  connection.end((err) => {
    if (err) {
      console.error('Erro ao fechar a conexão:', err);
    } else {
      console.log('[dbConnection] Conexão encerrada');
    }
  });
};
