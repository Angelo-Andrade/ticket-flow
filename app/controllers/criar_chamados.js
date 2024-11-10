const dbConnection = require('../../config/dbConnection');
const { criar_chamados, getCategoriaChamados } = require('../models/criar_chamados');


module.exports.render_criar_chamados = (app, req, res) => {
    console.log('[Controller Home]]');
    getCategoriaChamados(dbConnection, (error, result) => {
        if (error) {
            console.error(error);
            return res.render('notfound.ejs');
        }
        // Passa as categorias para a view
        res.render('criar_chamados.ejs', { categorias: result });
    });
};

module.exports.criar_chamados = (app, req, res) => {
    console.log('[Controller Criar Chamados]');
    const descricao = req.body.descricao;
    const id_categoria_chamado = req.body.id_categoria_chamado; // Pega o ID da categoria selecionada
    const urgencia = req.body.urgencia;
    console.log('Descricao', descricao);
    console.log('Categoria', id_categoria_chamado);
    console.log('Urgência', urgencia);
  
    dbConn = dbConnection();
    criar_chamados(dbConnection, descricao, urgencia, id_categoria_chamado, (error, result) => {
      if (error) {
        console.error(error);
        return res.render('notfound.ejs');
      }
      res.redirect('/criar_chamados');
    });
  };