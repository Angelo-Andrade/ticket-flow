const dbConnection = require('../../config/dbConnection');

module.exports = {
  teste: (dbConnection, callback) => {
    console.log("[Model home]")
    const sql = 'select * from chamado;';
    dbConnection.query(sql, callback);
  }
}