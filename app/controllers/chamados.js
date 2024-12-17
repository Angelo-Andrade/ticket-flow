const  dbConnection = require("../../config/dbConnection");
const { verificar_chamados_todos, verificar_chamados_filtrados } = require("../models/verificar_chamados");
const { criar_chamados, getCategoriaChamados } = require('../models/criar_chamados');


module.exports.verificar_chamados_todos = (app, req, res) => {
  console.log('[Controller verificar_chamados]');
  try {
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
  } catch (error) {
    console.log('[Controller verficar_chamados] erro com a querry' + error);
    return res.status(500).render('notfound.ejs', {
      errorMessage: 'Erro ao buscar chamados: ' + error.sqlMessage
    });
  }
  finally {
    if(dbConn) dbConnection.closeConnection(dbConn);
  }
};

module.exports.verificar_chamados_filtrados = (app, req, res) => {
  console.log('[Controller verificar_chamados]');
  try {
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
  } catch (error) {
    console.log('[Controller verficar_chamados] erro com a querry' + error);
    return res.status(500).render('notfound.ejs', {
      errorMessage: 'Erro ao buscar chamados: ' + error.sqlMessage
    });
  }
  finally {
    if(dbConn) dbConnection.closeConnection(dbConn);
  }
};

module.exports.render_criar_chamados = (app, req, res) => {
    console.log('[Controller Home]]');
    try {
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
    } catch (error) {
      console.log('[Controller verficar_chamados] erro com a querry' + error);
      return res.status(500).render('notfound.ejs', {
        errorMessage: 'Erro ao buscar chamados: ' + error.sqlMessage
      });
    }
    finally {
      if(dbConn) dbConnection.closeConnection(dbConn);
    }
};

module.exports.criar_chamado = (app, req, res) => {
    console.log('[Controller Criar Chamados]');
    try {
      const descricao = req.body.descricao;
      const id_categoria_chamado = req.body.id_categoria_chamado; // Pega o ID da categoria selecionada
      const urgencia = req.body.urgencia;
      const id_usuario = req.session.user.id;
      console.log('Descricao', descricao);
      console.log('Categoria', id_categoria_chamado);
      console.log('Urgência', urgencia);
    
      dbConn = dbConnection();
      criar_chamados(dbConn, descricao, urgencia, id_usuario, id_categoria_chamado, (error, result) => {
        if (error) {
          console.error('Erro ao criar chamado:', error);
          return res.status(500).render('notfound.ejs', {
              errorMessage: 'Erro ao criar chamado: ' + error.sqlMessage
          });
      }
        res.redirect('/criar_chamados');
      });
    } catch (error) {
      console.log('[Controller verficar_chamados] erro com a querry' + error);
      return res.status(500).render('notfound.ejs', {
        errorMessage: 'Erro ao buscar chamados: ' + error.sqlMessage
      });
    }
    finally {
      if(dbConn) dbConnection.closeConnection(dbConn);
    }
  };
