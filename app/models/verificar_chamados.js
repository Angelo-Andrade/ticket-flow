const dbConnection = require('../../config/dbConnection');

module.exports = {
  teste: (dbConnection, callback) => {
    console.log("[Model verificar_chamados]")
    const sql = 'select * from chamado;';
    dbConnection.query(sql, callback);
  }
}