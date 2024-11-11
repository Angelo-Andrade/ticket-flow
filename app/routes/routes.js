const { verificar_chamados_todos, verificar_chamados_filtrados } = require('../controllers/verificar_chamados');
const { criar_chamados, render_criar_chamados } = require('../controllers/criar_chamados');

module.exports = {
  verificar_chamados_todos: (app) => {
    app.get('/', function (req, res) {
      verificar_chamados_todos(app, req, res);
    });
  },

  verificar_chamados_filtrados: (app) => {
    app.get('/filtrar', function (req, res) {
      verificar_chamados_filtrados(app, req, res);
    });
  },
  criar_chamados: (app) => {
    app.post('/criar_chamado', function (req, res) {
      criar_chamados(app, req, res);
    });
  },
  
  render_criar_chamados: (app) => {
    app.get('/criar_chamados', function (req, res) {
      render_criar_chamados(app, req, res);
    });
  }

}
