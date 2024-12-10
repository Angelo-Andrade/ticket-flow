const  dbConnection = require("../../config/dbConnection");
const { closeConnection } = require("../../config/dbConnection") 
const { verificar_chamados_todos, verificar_chamados_filtrados } = require("../models/verificar_chamados");

module.exports.verificar_chamados_todos = (app, req, res) => {
  console.log('[Controller verificar_chamados]');
  dbConn = dbConnection();
  verificar_chamados_todos(dbConn, (error, result) => {
    if (error) {
      console.error('Erro ao buscar chamados:', error);
      return res.status(500).render('notfound.ejs', {
          errorMessage: 'Erro ao buscar chamados: ' + error.sqlMessage
      });
  }
    else {
      console.log('[Controller verificar_chamados] chamados encontrados');
      res.render('verificar_chamados.ejs', { tickets: result, filter: undefined });

    }
  });
  closeConnection(dbConn);
};

module.exports.verificar_chamados_filtrados = (app, req, res) => {
  console.log('[Controller verificar_chamados]');
  dbConn = dbConnection();
  const filter = req.query.filtro;
  const filter_value = req.query.valor;
  verificar_chamados_filtrados(dbConn, filter, filter_value, (error, result) => {
    if (error) {
      console.error('Erro ao buscar chamados:', error);
      return res.status(500).render('notfound.ejs', {
          errorMessage: 'Erro ao buscar chamados: ' + error.sqlMessage
      });
  }
    else {
      console.log(result);
      res.render('verificar_chamados.ejs', { tickets: result, filter: filter });
    }
  });
  closeConnection(dbConn);
};
