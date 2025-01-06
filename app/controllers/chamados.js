const  dbConnection = require("../../config/dbConnection");
const { verificar_chamados_todos, verificar_chamados_filtrados, alterar_chamado } = require("../models/verificar_chamados");
const { criar_chamados, getCategoriaChamados } = require('../models/criar_chamados');
const { excluir_chamado } = require('../models/excluir_chamados');



module.exports.verificar_chamados_todos = (app, req, res) => {
  console.log('[Controller verificar_chamados]');
  try {
    dbConn = dbConnection();
    if (req.session.user.user_type === 'admin'){
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
    } else {
      filtro = `WHERE u.id_usuario = ${req.session.user.id} `;
      verificar_chamados_filtrados(dbConn, filtro, (error, result) => {
        if (error) {
          console.error('Erro ao buscar chamados:', error);
          return res.status(500).render('notfound.ejs', {
              errorMessage: 'Erro ao buscar chamados: ' + error.sqlMessage
          });
        }
        else {
          console.log(result);
          res.render('verificar_chamados.ejs', { tickets: result, filter: undefined });
        }
      });
    }
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
    if (req.session.user.user_type === 'admin'){
      const filterquery = `WHERE ${filter} LIKE '%${filter_value}%' `
      verificar_chamados_filtrados(dbConn, filterquery, (error, result) => {
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
    } else {
      const filterquery = `WHERE ${filter} LIKE '%${filter_value}%' AND u.id_usuario = ${req.session.user.id} `;
      verificar_chamados_filtrados(dbConn, filterquery, (error, result) => {
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
    }
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
          res.render('criar_chamados.ejs', { categorias: result, error: null });
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

module.exports.render_erro_criar_chamados = (app, req, res, invalidInput) => {
    console.log('[Controller erro criar chamados]');
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
          res.render('criar_chamados.ejs', { categorias: result, error });
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

  module.exports.excluir_chamado = (app, req, res) => {
    console.log('[Controller Excluir Chamados]');
    try {
      const id_chamado = req.body.id;
      
      console.log('Id Chamado', id_chamado);
    
      dbConn = dbConnection();
      excluir_chamado(dbConn, id_chamado, (error, result) => {
        if (error) {
          console.error('Erro ao excluir chamado:', error);
          return res.status(500).render('notfound.ejs', {
              errorMessage: 'Erro ao excluir chamado: ' + error.sqlMessage
          });
      }
        res.redirect('/');
      });
    } catch (error) {
      console.log('[Controller excluir_chamados] erro com a querry' + error);
      return res.status(500).render('notfound.ejs', {
        errorMessage: 'Erro ao excluir chamados: ' + error.sqlMessage
      });
    }
    finally {
      if(dbConn) dbConnection.closeConnection(dbConn);
    }
  };


  module.exports.alterar_chamado = (app, req, res) => {
    console.log('[Controller Alterar Chamados]');
    try {
      const { id, descricao, status_chamado, urgencia } = req.body;
  
      console.log('Dados recebidos:', { id, descricao, status_chamado, urgencia });
  
      const dbConn = dbConnection();
      alterar_chamado(dbConn, { id, descricao, status_chamado, urgencia }, (error, result) => {
        if (error) {
          console.error('Erro ao alterar chamado:', error);
          return res.status(500).render('notfound.ejs', {
            errorMessage: 'Erro ao alterar chamado: ' + error.sqlMessage,
          });
        }
  
        res.redirect('/');
      });
    } catch (error) {
      console.error('[Controller alterar_chamado] Erro com a query:', error);
      return res.status(500).render('notfound.ejs', {
        errorMessage: 'Erro ao alterar chamado: ' + error.message,
      });
    } finally {
      if (dbConn) dbConnection.closeConnection(dbConn);
    }
  };
  
