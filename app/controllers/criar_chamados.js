const dbConnection = require("../../config/dbConnection");
const { closeConnection } = require("../../config/dbConnection");
const { criar_chamados, getCategoriaChamados } = require('../models/criar_chamados');

module.exports.render_criar_chamados = (app, req, res) => {
    console.log('[Controller Home]]');
    dbConn = dbConnection();
    getCategoriaChamados(dbConn, (error, result) => {
        if (error) {
            console.error(error);
            return res.render('notfound.ejs', {
              errorMessage: 'Erro ao carregar a página: ' + error
            });
        }
        // Passa as categorias para a view
        res.render('criar_chamados.ejs', { categorias: result });
    });
    closeConnection(dbConn);
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
    criar_chamados(dbConn, descricao, urgencia, id_categoria_chamado, (error, result) => {
      if (error) {
        console.error('Erro ao criar chamado:', error);
        return res.status(500).render('notfound.ejs', {
            errorMessage: 'Erro ao criar chamado: ' + error.sqlMessage
        });
    }
      res.redirect('/criar_chamados');
    });
    closeConnection(dbConn);
  };



