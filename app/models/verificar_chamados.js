const dbConnection = require('../../config/dbConnection');

module.exports = {
  verificar_chamados_todos: (dbConnection, callback) => {
    console.log("[Model verificar_chamados]");
    const sql = 'select * from chamado;';
    dbConnection.query(sql, callback);
  },

  verificar_chamados_filtrados: (dbConnection, filter, callback) => {
    console.log("[Model verificar_chamados]");
    console.log(filter);
    const sql = `select * from chamado where status_chamado = '${filter}';`;
    dbConnection.query(sql, callback);
  }
}