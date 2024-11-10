const dbConnection = require('../../config/dbConnection');
const { teste } = require('../models/home');

module.exports.home = (app, req, res) => {
  //aqui vamos fazer a chamada para o model do banco de dados.
  console.log('[Controller Home]');
  dbConn = dbConnection();
  teste(dbConn, (error, result) => {
    console.log(result);
    res.render('home.ejs', { tickets: result });
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
