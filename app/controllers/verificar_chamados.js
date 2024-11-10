const dbConnection = require('../../config/dbConnection');
const { teste } = require('../models/verificar_chamados');

module.exports.verificar_chamados = (app, req, res) => {
  console.log('[Controller verificar_chamados]');
  dbConn = dbConnection();
  teste(dbConn, (error, result) => {
    console.log(result);
    res.render('verificar_chamados.ejs', { tickets: result });
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
