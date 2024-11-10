const dbConnection = require('../../config/dbConnection');
const { verificar_chamados_todos, verificar_chamados_filtrados } = require('../models/verificar_chamados');

module.exports.verificar_chamados_todos = (app, req, res) => {
  console.log('[Controller verificar_chamados]');
  dbConn = dbConnection();
  verificar_chamados_todos(dbConn, (error, result) => {
    if(error) {
      console.log(error);
    }
    else {
      console.log(result);
      res.render('verificar_chamados.ejs', { tickets: result });

    }
  });
};

module.exports.verificar_chamados_filtrados = (app, req, res) => {
  console.log('[Controller verificar_chamados]');
  dbConn = dbConnection();
  const filter = req.query.status;
  verificar_chamados_filtrados(dbConn, filter, (error, result) => {
    console.log(result);
    res.render('verificar_filtrados.ejs', { tickets: result, filter: filter });
  });
};

// module.exports.addComment = (app, req, res) => {
//   console.log('[Controller Home] Save Comment');
//   const idObra = req.query.idobra;
//   const comment = req.body.comment;
//   console.log('idObra', idObra);
//   console.log('Comment', comment);
//   dbConn = dbConnection();
//   addComment(dbConn, idObra, comment, (error, result) => {
//     console.log(error);
//     console.log(result);
//     res.redirect('/');
//   });
// };
