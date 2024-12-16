const { verificar_chamados_todos, verificar_chamados_filtrados } = require('../controllers/verificar_chamados');
const { criar_chamados, render_criar_chamados } = require('../controllers/criar_chamados');
const { render_conectar, autenticar, desconectar } = require('../controllers/usuarios');

module.exports = {
  verificar_chamados_todos: (app) => {
    app.get('/', function (req, res) {
      if(req.session.user) verificar_chamados_todos(app, req, res);
      else res.redirect('/usuario/conectar');
    });
  },

  verificar_chamados_filtrados: (app) => {
    app.get('/filtrar', function (req, res) {
      if(req.session.user) verificar_chamados_filtrados(app, req, res);
      else res.redirect('/usuario/conectar');
    });
  },
  
  criar_chamados: (app) => {
    app.post('/criar_chamado', function (req, res) {
      if(req.session.user) criar_chamados(app, req, res);
      else res.redirect('/usuario/conectar');
    });
  },
  
  render_criar_chamados: (app) => {
    app.get('/criar_chamados', function (req, res) {
      if(req.session.user) render_criar_chamados(app, req, res);
      else res.redirect('/usuario/conectar');
    });
  },

  render_conectar: (app) => {
    app.get('/usuario/conectar', function (req, res) {
      if(req.session.user) res.redirect('/');
      else render_conectar(app, req, res);
    });
  },

  autenticar_usuario: (app) => {
    app.post('/usuario/autenticar', function (req, res) {
      if(req.session.user) res.redirect('/'); 
      else autenticar(app, req, res);
    });
  },

  desconectar_usuario: (app) => {
    app.get('/usuario/desconectar', function (req, res) {
      desconectar(app, req, res);
    });
  },

  render_not_found: (app) => {
    app.get('*', function (req, res) {
      res.render('notfound.ejs', {errorMessage: 'Um erro inesperado aconteceu.\nPor favor volte mais tarde'});
    });
  }

}
