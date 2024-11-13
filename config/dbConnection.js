const mysql = require("mysql2");

const host = "sql10.freesqldatabase.com";
const database = "sql10744601";
const user = "sql10744601";
const password = "BZAtPjn7Gi";

module.exports = () => {
  return (dbConnection = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
  }));
  console.log('[dbConnection] conexão aberta');
};

module.exports.closeConnection = (connection) => {
  connection.end((err) => {
    if (err) {
      console.error('Erro ao fechar a conexão:', err);
    } else {
      console.log('Conexão encerrada com sucesso!');
    }
  });
};